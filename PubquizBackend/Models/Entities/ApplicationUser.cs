using Microsoft.AspNetCore.Identity;

namespace PubquizBackend.Models.Entities;

public class ApplicationUser: IdentityUser<Guid>
{
    public string DisplayName { get; set; } = null!;
    public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    public string? ProfileImageUrl { get; set; }
}