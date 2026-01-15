using PubquizBackend.Models.Dtos;

namespace PubquizBackend.Service;

public interface IGameManagerService
{
    Task<string> CreateGameAsync(Guid hostId, QuizDto quizData);
    bool RoomExists(string code);
}