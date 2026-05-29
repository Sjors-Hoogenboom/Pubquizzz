using System.ComponentModel.DataAnnotations;

namespace PubquizBackend.Models.Dtos;

public class LoginRequestDTO
{
    [Required] 
    public string UsernameOrEmail { get; init; } = null!;
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; init; } = null!;
}
