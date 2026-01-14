using Microsoft.EntityFrameworkCore;
using PubquizBackend.Data;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Repository;


public sealed class AuthRepository : IAuthRepository
{
    private readonly PubquizDbContext _db;
    public AuthRepository(PubquizDbContext db) => _db = db;

    public Task<User?> GetByEmailAsync(string normalizedEmail, CancellationToken ct) =>
        _db.Users
            .Include(u => u.Roles)
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == normalizedEmail, ct);

    public Task<User?> GetByIdAsync(Guid id, CancellationToken ct) =>
        _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.UserId == id, ct);

    public Task<bool> EmailExistsAsync(string normalizedEmail, CancellationToken ct) =>
        _db.Users.AsNoTracking().AnyAsync(u => u.Email == normalizedEmail, ct);

    public async Task AddAsync(User user, CancellationToken ct)
    {
        await _db.Users.AddAsync(user, ct);
    }

    public Task SaveChangesAsync(CancellationToken ct) => _db.SaveChangesAsync(ct);
}