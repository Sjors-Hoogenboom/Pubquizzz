namespace PubquizBackend.Models.Entities;

public class User
{
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime CreationDate { get; set; } = DateTime.Now;
    public string ProfileImage { get; set; }
}