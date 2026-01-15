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
    public List<string> Players { get; set; } = [];
    public string State { get; set; } = "Lobby";
}