using PubquizBackend.Models.Entities;
using PubquizBackend.Models.Enums;
using PubquizBackend.Repository;

namespace PubquizBackend.Service;

public class GameService : IGameService
{
    private readonly IGameRepository _repo;
    
    public GameService(IGameRepository gameRepository) => _repo = gameRepository;
    
    public async Task CreateGameSessionAsync(Guid hostId, Guid guizId, string roomCode)
    {
        var newSession = new GameSession
        {
            SessionId = Guid.NewGuid(),
            HostId = hostId,
            PubquizId = guizId,
            RoomCode = roomCode,
            StartedAt = DateTime.UtcNow,
            State = GameState.Lobby,
        };
        
        await _repo.AddGameSessionAsync(newSession);
        await _repo.SaveChangesAsync();
    }
}