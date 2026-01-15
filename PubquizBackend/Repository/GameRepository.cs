using Microsoft.EntityFrameworkCore;
using PubquizBackend.Data;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Repository;

public class GameRepository : IGameRepository
{
    private readonly PubquizDbContext _db;

    public GameRepository(PubquizDbContext db) => _db = db;

    public async Task AddGameSessionAsync(GameSession gameSession)
    {
        await _db.GameSessions.AddAsync(gameSession);
    }

    public async Task SaveChangesAsync()
    {
        await _db.SaveChangesAsync();
    }

    public async Task<Pubquiz?> GetQuizWithQuestionsAsync(Guid quizId)
    {
        return await _db.Pubquizzes
            .AsNoTracking()
            .Include(pq => pq.PubquizQuestions)
            .ThenInclude(pq => pq.Question)
            .ThenInclude(q => q.AnswerOptions)
            .FirstOrDefaultAsync(q => q.PubquizId == quizId);
    }
}