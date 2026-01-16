using System.Collections.Concurrent;
using PubquizBackend.Models.Dtos;

namespace PubquizBackend.Service;

public class GameManagerService : IGameManagerService
{
    private readonly ConcurrentDictionary<string, activeLobby> _games = new();

    public Task<string> CreateGameAsync(Guid hostId, QuizDto quizData)
    {
        string code;
        do
        {
            code = GenerateCode();
        } while (_games.ContainsKey(code));

        var lobby = new activeLobby
        {
            Code = code,
            HostId = hostId,
            QuizData = quizData
        };
        
        _games.TryAdd(code, lobby);
        
        return Task.FromResult(code);
    }

    public bool RoomExists(string code) => _games.ContainsKey(code.ToUpper());
    public bool IsHost(string code, Guid userId)
    {
        if (!_games.TryGetValue(code.ToUpper(), out var lobby)) return false;
        return lobby.HostId == userId;
    }

    public bool AddPlayer(string roomCode, string nickName)
    {
        if (!_games.TryGetValue(roomCode.ToUpper(), out var lobby)) return false;

        lock (lobby)
        {
            if (lobby.Players.Contains(nickName))
            {
                return false;
            }
            lobby.Players.Add(nickName);
            return true;
        }
    }

    public List<string> GetPlayers(string code)
    {
        return !_games.TryGetValue(code.ToUpper(), out var lobby) ? [] : lobby.Players;
    }

    private string GenerateCode()
    {
        var random = new Random();
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return new string(Enumerable.Repeat(chars, 4).Select(s => s[random.Next(s.Length)]).ToArray());
    }
}


public class activeLobby
{
    public string Code { get; set; }
    public Guid HostId { get; set; }
    public QuizDto QuizData { get; set; }
    public List<string> Players { get; set; } = new();
    public string State { get; set; } = "Lobby";
}