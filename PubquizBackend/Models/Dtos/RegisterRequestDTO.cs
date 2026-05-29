using System.ComponentModel.DataAnnotations;

namespace PubquizBackend.Models.Dtos;

public class RegisterRequestDTO
{
    [Required] [MinLength(3)] 
    public string Username { get; init; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; init; } = null!;

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; init; } = null!;
}