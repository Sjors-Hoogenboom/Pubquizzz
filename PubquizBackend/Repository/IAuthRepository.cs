using Microsoft.AspNetCore.Identity;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Repository;

public interface IAuthRepository
{
    Task<ApplicationUser?> FindByIdAsync(Guid id);
    Task<ApplicationUser?> FindByUsernameAsync(string username);
    Task<ApplicationUser?> FindByEmailAsync(string email);
    Task<bool> CheckPasswordAsync(ApplicationUser user, string password);
    Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password);
    Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string role);
    Task<bool> RoleExistsAsync(string role);
    Task<IList<string>> GetRolesAsync(ApplicationUser user);
}