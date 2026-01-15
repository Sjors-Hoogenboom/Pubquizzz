using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Entities;
using PubquizBackend.Models.Enums;
using PubquizBackend.Repository;

namespace PubquizBackend.Service;

public class GameService : IGameService
{
    private readonly IGameRepository _repo;

    public GameService(IGameRepository gameRepository) => _repo = gameRepository;

    public async Task<QuizDto?> GetQuizAsync(Guid quizId)
    {
        var entity = await _repo.GetQuizWithQuestionsAsync(quizId);
        if (entity == null)
        {
            return null;
        }

        var questionsDto = entity.PubquizQuestions
            .OrderBy(pq => pq.Order)
            .Select(pq => new QuestionDto(
                pq.Question.QuestionId,
                pq.Question.QuestionText,
                pq.Question.QuestionDescription,
                pq.Question.Points,
                pq.Question.TimeLimit,
                pq.Question.AnswerOptions.Select(a => new AnswerDto(
                        a.AnswerOptionId,
                        a.Text,
                        a.IsCorrect))
                    .ToList())).ToList();
        
        return new QuizDto(
            entity.PubquizId,
            entity.Title,
            entity.Description,
            questionsDto);
    }
}