using PubquizBackend.Models;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Entities;
using PubquizBackend.Repository;

namespace PubquizBackend.Service;

public class AuthService(
    IAuthRepository authRepository,
    ITokenService tokenService) : IAuthService
{
    public async Task<LoginResponseDTO?> LoginAsync(LoginRequestDTO req, CancellationToken ct)
    {
        ct.ThrowIfCancellationRequested();

        var user = await FindUserByUsernameOrEmailAsync(req.UsernameOrEmail);

        if (user is null)
        {
            return null;
        }

        var passwordValid = await authRepository.CheckPasswordAsync(user, req.Password);

        if (!passwordValid)
        {
            return null;
        }

        var roles = await authRepository.GetRolesAsync(user);

        var tokenResult = tokenService.Create(user, roles);

        return new LoginResponseDTO
        {
            AccessToken = tokenResult.token,
            ExpiresAtUtc = tokenResult.expiresUtc
        };
    }

    public async Task<AuthResult> RegisterAsync(RegisterRequestDTO req, CancellationToken ct)
    {
        ct.ThrowIfCancellationRequested();

        var existingUsername = await authRepository.FindByUsernameAsync(req.Username);

        if (existingUsername is not null)
        {
            return AuthResult.Failed(
                ["Username is already taken."],
                isConflict: true
            );
        }

        var existingEmail = await authRepository.FindByEmailAsync(req.Email);

        if (existingEmail is not null)
        {
            return AuthResult.Failed(
                ["Email is already taken."],
                isConflict: true
            );
        }

        var defaultRole = Role.User.ToString();

        var roleExists = await authRepository.RoleExistsAsync(defaultRole);

        if (!roleExists)
        {
            return AuthResult.Failed(
                [$"Role '{defaultRole}' does not exist. Did the seeder run?"]
            );
        }

        var user = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            UserName = req.Username,
            Email = req.Email,
            DisplayName = req.Username,
            CreationDate = DateTime.UtcNow
        };

        var createResult = await authRepository.CreateUserAsync(user, req.Password);

        if (!createResult.Succeeded)
        {
            return AuthResult.Failed(
                createResult.Errors.Select(e => e.Description)
            );
        }

        var roleResult = await authRepository.AddToRoleAsync(user, defaultRole);

        if (!roleResult.Succeeded)
        {
            return AuthResult.Failed(
                roleResult.Errors.Select(e => e.Description)
            );
        }

        return AuthResult.Success();
    }

    private async Task<ApplicationUser?> FindUserByUsernameOrEmailAsync(string usernameOrEmail)
    {
        if (usernameOrEmail.Contains('@'))
        {
            var userByEmail = await authRepository.FindByEmailAsync(usernameOrEmail);

            if (userByEmail is not null)
            {
                return userByEmail;
            }
        }

        return await authRepository.FindByUsernameAsync(usernameOrEmail);
    }
}