using Microsoft.AspNetCore.Identity;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Entities;
using PubquizBackend.Models.Helpers;
using PubquizBackend.Repository;

namespace PubquizBackend.Service;

public sealed class AuthService : IAuthService
{
    private readonly IAuthRepository _repo;
    private readonly IPasswordHasher<User> _hasher;
    private readonly ITokenService _tokens;

    public AuthService(IAuthRepository repo, IPasswordHasher<User> hasher, ITokenService tokens)
    {
        _repo = repo;
        _hasher = hasher;
        _tokens = tokens;
    }

    public async Task<LoginResponseDTO?> LoginAsync(LoginRequestDTO req, CancellationToken ct)
    {
        var email = NormalizeEmail(req.Email);
        var user = await _repo.GetByEmailAsync(email, ct);
        if (user is null) return null;

        var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, req.Password);
        if (result == PasswordVerificationResult.Failed) return null;

        var (token, exp) = _tokens.Create(user);
        return new LoginResponseDTO { AccessToken = token, ExpiresAtUtc = exp };
    }

    public async Task<(UserDTO user, LoginResponseDTO token)?> RegisterAsync(RegisterRequestDTO req, CancellationToken ct)
    {
        var email = NormalizeEmail(req.Email);

        if (await _repo.EmailExistsAsync(email, ct))
            return null;

        var user = new User
        {
            UserId = Guid.NewGuid(),
            DisplayName = req.DisplayName.Trim(),
            Email = email,
            CreationDate = DateTime.UtcNow
        };

        user.PasswordHash = _hasher.HashPassword(user, req.Password);
        user.Roles.Add(new UserRole { UserId = user.UserId, Role = Role.User, User = user });

        await _repo.AddAsync(user, ct);
        await _repo.SaveChangesAsync(ct);
        
        var (token, exp) = _tokens.Create(user);
        return (user.ToDto(), new LoginResponseDTO { AccessToken = token, ExpiresAtUtc = exp });
    }

    private static string NormalizeEmail(string email) => email.Trim().ToLowerInvariant();
}