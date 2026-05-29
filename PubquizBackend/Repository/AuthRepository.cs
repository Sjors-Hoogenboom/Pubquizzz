using Microsoft.AspNetCore.Identity;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Repository;

public class AuthRepository(
    UserManager<ApplicationUser> userManager,
    RoleManager<IdentityRole<Guid>> roleManager) : IAuthRepository
{
    public Task<ApplicationUser?> FindByIdAsync(Guid id)
    {
        return userManager.FindByIdAsync(id.ToString());
    }

    public Task<ApplicationUser?> FindByUsernameAsync(string username)
    {
        return userManager.FindByNameAsync(username);
    }

    public Task<ApplicationUser?> FindByEmailAsync(string email)
    {
        return userManager.FindByEmailAsync(email);
    }

    public Task<bool> CheckPasswordAsync(ApplicationUser user, string password)
    {
        return userManager.CheckPasswordAsync(user, password);
    }

    public Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password)
    {
        return userManager.CreateAsync(user, password);
    }

    public Task<IdentityResult> AddToRoleAsync(ApplicationUser user, string role)
    {
        return userManager.AddToRoleAsync(user, role);
    }

    public Task<bool> RoleExistsAsync(string role)
    {
        return roleManager.RoleExistsAsync(role);
    }

    public Task<IList<string>> GetRolesAsync(ApplicationUser user)
    {
        return userManager.GetRolesAsync(user);
    }
}