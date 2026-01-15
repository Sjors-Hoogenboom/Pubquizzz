namespace PubquizBackend.Service;

public interface IGameManagerService
{
    Task<string> CreateGameAsync(Guid hostId, Guid quizId);
    bool RoomExists(string code);
}