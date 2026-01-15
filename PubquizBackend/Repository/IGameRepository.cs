using PubquizBackend.Models.Entities;

namespace PubquizBackend.Repository;

public interface IGameRepository
{
    Task AddGameSessionAsync(GameSession gameSession);
    Task SaveChangesAsync();
}