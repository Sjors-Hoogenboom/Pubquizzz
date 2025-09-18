namespace PubquizBackend.Models.Entities;

public enum GameStatus
{
    Paused,
    Playing,
    Finished
}

public class Game
{
    public Guid GameId { get; set; }
    public Guid PubquizId { get; set; }
    public Guid HostId { get; set; }
    public GameStatus GameStatus { get; set; }
    
    public DateTime CreationDate { get; set; }
    public DateTime FinishedDate { get; set; }
}