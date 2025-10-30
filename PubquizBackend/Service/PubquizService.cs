using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Helpers;
using PubquizBackend.Repository;

namespace PubquizBackend.Service;

public class PubquizService : IPubquizService
{
    private readonly IPubquizRepository _repo;

    public PubquizService(IPubquizRepository repo) => _repo = repo;

    public async Task<QuizDto?> GetFullQuizAsync(Guid id, CancellationToken ct)
    {
        var quiz = await _repo.GetPublishedByIdAsync(id, ct);
        return quiz?.ToDto();
    }

    public async Task<QuizDto?> GetLatestPublishedQuizAsync(CancellationToken ct)
    {
        var quiz = await _repo.GetLatestPublishedAsync(ct);
        return quiz?.ToDto();
    }
}