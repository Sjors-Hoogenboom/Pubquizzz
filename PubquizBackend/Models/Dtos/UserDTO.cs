namespace PubquizBackend.Models.Dtos;

public class UserDTO
{
    public Guid UserId { get; set; }
    public string DisplayName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public DateTime CreationDate { get; set; }
    public string? ProfileImageUrl { get; set; }
    public IReadOnlyList<string> Roles { get; set; } = Array.Empty<string>();
}