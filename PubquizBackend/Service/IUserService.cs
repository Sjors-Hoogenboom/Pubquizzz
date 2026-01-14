using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Service;

public interface IUserService
{
    Task<DisplayNameDTO?> GetDisplayNameAsync(Guid userId);
}