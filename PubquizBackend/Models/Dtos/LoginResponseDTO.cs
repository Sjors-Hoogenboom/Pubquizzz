namespace PubquizBackend.Models.Dtos;

public class LoginResponseDTO
{
    public string AccessToken { get; init; } = null!;
    public DateTime ExpiresAtUtc { get; init; }
}