using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Models.Helpers;

public static class QuizMappers
{
    public static QuizDto ToDto(this Pubquiz quiz)
    {
        var qDtos = quiz.PubquizQuestions
            .OrderBy(pq => pq.Order)
            .Select(pq =>
            {
                var q = pq.Question;
                
                var answers = q.AnswerOptions
                    .OrderBy(a => a.AnswerOptionId)
                    .Select(a => new AnswerDto(a.AnswerOptionId, a.Text, a.IsCorrect))
                    .ToList()
                    .AsReadOnly();

                return new QuestionDto(
                    q.QuestionId,
                    q.QuestionText,
                    q.QuestionDescription,
                    q.Points,
                    q.TimeLimit,
                    answers
                );
            })
            .ToList()
            .AsReadOnly();

        return new QuizDto(
            quiz.PubquizId,
            quiz.Title,
            quiz.Description,
            qDtos
        );
    }
}