using Microsoft.EntityFrameworkCore;
using PubquizBackend.Data;
using PubquizBackend.Models.Entities;
using Microsoft.AspNetCore.Identity; 

namespace PubquizBackend;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        var db = serviceProvider.GetRequiredService<PubquizDbContext>();
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

        await db.Database.MigrateAsync();

        foreach (var roleName in Enum.GetNames<Role>())
        {
            if (await roleManager.RoleExistsAsync(roleName)) continue;
            var result = await roleManager.CreateAsync(new IdentityRole<Guid>(roleName));

            if (result.Succeeded) continue;
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new InvalidOperationException($"Could not create role '{roleName}': {errors}");
        }
    }
}