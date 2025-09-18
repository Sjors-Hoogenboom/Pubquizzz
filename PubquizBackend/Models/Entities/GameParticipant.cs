namespace PubquizBackend.Models.Entities;

public class GameParticipant
{
    public Guid GameId { get; set; }
    public Guid UserId { get; set; }
    public DateTime JoinedAt { get; set; }
}