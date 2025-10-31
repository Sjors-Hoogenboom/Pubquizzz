namespace PubquizBackend.Models.Dtos;

public class LoginResponseDTO
{
    public string AccessToken { get; set; } = default!;
    public DateTime ExpiresAtUtc { get; set; }
}