namespace PubquizBackend.Models.Entities;

public enum Role
{
    Admin,
    User,
    Creator,
    Host
}

public class UserRole
{
    public Guid UserId { get; set; }
    public Role Role { get; set; }
    public User User { get; set; }
}