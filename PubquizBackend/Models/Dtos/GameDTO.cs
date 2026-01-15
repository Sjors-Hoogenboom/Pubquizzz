namespace PubquizBackend.Models.Dtos;

public class GameDTO
{
    public string RoomCode { get; set; } = string.Empty;
    public Guid HostId { get; set; }
    public string QuizTitle { get; set; } = string.Empty;
}