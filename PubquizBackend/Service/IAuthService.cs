using PubquizBackend.Models.Dtos;

namespace PubquizBackend.Service;

public interface IAuthService
{
    Task<LoginResponseDTO?> LoginAsync(LoginRequestDTO req, CancellationToken ct);
    Task<(UserDTO user, LoginResponseDTO token)?> RegisterAsync(RegisterRequestDTO req, CancellationToken ct);
}