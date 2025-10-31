using System.ComponentModel.DataAnnotations;

namespace PubquizBackend.Models.Dtos;

public class LoginRequestDTO
{
    [Required, EmailAddress] 
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; } = default!;
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; } = default!;
}
