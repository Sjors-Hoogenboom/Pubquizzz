using System.ComponentModel.DataAnnotations;
using PubquizBackend.Models.Enums;

namespace PubquizBackend.Models.Entities;

public class GameSession
{
    [Key]
    public Guid SessionId { get; set; }
    public Guid HostId { get; set; }
    public User Host { get; set; }
    public Guid PubquizId { get; set; }
    public Pubquiz Pubquiz { get; set; }
    public string RoomCode { get; set; }
    public DateTime StartedAt { get; set; }
    public GameState State { get; set; }
}