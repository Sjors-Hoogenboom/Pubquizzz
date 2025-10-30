using Microsoft.EntityFrameworkCore;
using PubquizBackend.Data;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Repository;

public sealed class PubquizRepository : IPubquizRepository
{
    private readonly PubquizDbContext _db;

    public PubquizRepository(PubquizDbContext db) => _db = db;

    public async Task<Pubquiz?> GetPublishedByIdAsync(Guid id, CancellationToken ct)
    {
        return await BaseQuery()
            .Where(p => p.PubquizId == id && p.IsPublished)
            .FirstOrDefaultAsync(ct);
    }

    public async Task<Pubquiz?> GetLatestPublishedAsync(CancellationToken ct)
    {
        return await BaseQuery()
            .OrderByDescending(p => p.CreationDate)
            .FirstOrDefaultAsync(ct);
    }
    
    private IQueryable<Pubquiz> BaseQuery() =>
        _db.Pubquizes
            .AsNoTracking()
            .AsSplitQuery() // safer for big include graphs
            .Include(p => p.PubquizQuestions)
            .ThenInclude(pq => pq.Question)
            .ThenInclude(q => q.AnswerOptions);
}