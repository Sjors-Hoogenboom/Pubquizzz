using PubquizBackend.Models.Entities;

namespace PubquizBackend.Service;

public interface IGameService
{
    Task CreateGameSessionAsync(Guid hostId, Guid guizId, string roomCode);
}