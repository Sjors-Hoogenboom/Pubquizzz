using PubquizBackend.Models;
using PubquizBackend.Models.Dtos;

namespace PubquizBackend.Service;

public interface IAuthService
{
    Task<LoginResponseDTO?> LoginAsync(LoginRequestDTO req, CancellationToken ct);
    Task<AuthResult> RegisterAsync(RegisterRequestDTO req, CancellationToken ct);
}