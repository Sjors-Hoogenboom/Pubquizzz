using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Service;

public interface IGameService
{
    Task<QuizDto?> GetQuizAsync(Guid quizId);
}