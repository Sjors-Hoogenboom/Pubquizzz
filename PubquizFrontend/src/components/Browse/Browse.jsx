import { useEffect, useState } from "react";
import { fetchQuizApi, createGameApi } from "@/api/http";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Browse() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(null);
    const [errors, setErrors] = useState({});

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuizApi()
            .then(data => setQuizzes(Array.isArray(data) ? data : [data]))
            .catch(console.error);
    }, []);

    const handleHost = async (quizId) => {
        if (!user) {
            triggerError(quizId, "Please log in to host");
            return;
        }

        setLoading(quizId);
        try {
            const gameData = await createGameApi(quizId);
            navigate(`/host/${gameData.roomCode}`);
        } catch (error) {
            triggerError(quizId, "Failed to start");
        } finally {
            setLoading(null);
        }
    };

    const triggerError = (id, message) => {
        setErrors(prev => ({ ...prev, [id]: message }));
        setTimeout(() => {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center pt-36 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Browse Quizzes</h1>
            <div className="grid grid-cols-1 gap-4 w-full max-w-3xl">
                {quizzes.map((quiz) => {
                    const id = quiz.pubquizId || quiz.id;
                    const isError = !!errors[id];
                    const isLoading = loading === id;

                    return (
                        <Card key={id} className="flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle>{quiz.title}</CardTitle>
                                <CardDescription>{quiz.description || ""}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {quiz.questions?.length || 0} Questions
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className={`w-full text-white transition-all duration-300 ${
                                        isError
                                            ? "bg-red-600 "
                                            : "bg-indigo-600 hover:bg-indigo-700"
                                    }`}
                                    onClick={() => handleHost(id)}
                                    disabled={isLoading || isError}
                                >
                                    {isError
                                        ? errors[id]
                                        : isLoading
                                            ? "Creating..."
                                            : "Host Game"
                                    }
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}