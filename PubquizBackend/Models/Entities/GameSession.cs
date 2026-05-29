using System.ComponentModel.DataAnnotations;
using PubquizBackend.Models.Enums;

namespace PubquizBackend.Models.Entities;

public class GameSession
{
    [Key]
    public Guid SessionId { get; set; }
    public Guid HostId { get; set; }
    public ApplicationUser Host { get; set; } = null!;
    public Guid PubquizId { get; set; }
    public Pubquiz Pubquiz { get; set; } = null!;
    public string RoomCode { get; set; } = null!;
    public DateTime StartedAt { get; set; }
    public GameState State { get; set; }
}