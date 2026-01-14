using PubquizBackend.Models.Dtos;
using PubquizBackend.Repository;

namespace PubquizBackend.Service;

public class UserService : IUserService
{
    private readonly IAuthRepository _repo;

    public UserService(IAuthRepository repo)
    {
        _repo = repo;
    }

    public async Task<DisplayNameDTO?> GetDisplayNameAsync(Guid id)
    {
        var user = await _repo.GetByIdAsync(id);

        if (user is null) return null;
        
        return new DisplayNameDTO { DisplayName = user.DisplayName };
    }
    
}