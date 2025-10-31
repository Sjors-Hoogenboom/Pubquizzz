using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Models.Helpers;

public static class UserMappings
{
    public static UserDTO ToDto(this User u) => new UserDTO
    {
        UserId = u.UserId,
        DisplayName = u.DisplayName,
        Email = u.Email,
        CreationDate = u.CreationDate,
        ProfileImageUrl = u.ProfileImageUrl,
        Roles = u.Roles.Select(r => r.Role.ToString()).ToList()
    };
}