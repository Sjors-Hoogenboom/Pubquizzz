﻿using PubquizBackend.Models.Entities;

namespace PubquizBackend.Repository;

public interface IAuthRepository
{
    Task<User?> GetByEmailAsync(string normalizedEmail, CancellationToken ct);
    Task<bool> EmailExistsAsync(string normalizedEmail, CancellationToken ct);
    Task AddAsync(User user, CancellationToken ct);
    Task SaveChangesAsync(CancellationToken ct);
}