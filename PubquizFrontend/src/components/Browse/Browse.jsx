import { useEffect, useState } from "react";
import { fetchQuizApi, createGameApi } from "@/api/http";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Browse() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuizApi()
            .then(data => setQuizzes(Array.isArray(data) ? data : [data]))
            .catch(console.error);
    }, []);

    const handleHost = async (quizId) => {
        setLoading(true);
        try {
            const gameData = await createGameApi(quizId);

            navigate(`/host/${gameData.roomCode}`);
        } catch (error) {
            alert("Failed to start game: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center pt-36 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Browse Quizzes</h1>
            <div className="grid grid-cols-1 gap-4 w-full max-w-3xl">
                {quizzes.map((quiz) => (
                    <Card key={quiz.pubquizId || quiz.id} className="flex flex-col justify-between">
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
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={() => handleHost(quiz.pubquizId || quiz.id)}
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Host Game"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}