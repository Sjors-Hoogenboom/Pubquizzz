using System.ComponentModel.DataAnnotations;

namespace PubquizBackend.Models.Dtos;

public class RegisterRequestDTO
{
    [Required]
    public string DisplayName { get; set; }
    
    [Required]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}