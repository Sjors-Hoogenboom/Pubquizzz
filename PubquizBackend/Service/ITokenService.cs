using PubquizBackend.Models.Entities;

namespace PubquizBackend.Service;

public interface ITokenService
{
    (string token, DateTime expiresUtc) Create(User user);
}