namespace PubquizBackend.Models.Entities;

public class User
{
    public Guid UserId { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; } = default!;
    public DateTime CreationDate { get; set; } = DateTime.Now;
    public string? ProfileImageUrl { get; set; }
    
    public ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
}