using PubquizBackend.Models.Dtos;

namespace PubquizBackend.Service;

public interface IPubquizService
{
    Task<QuizDto?> GetFullQuizAsync(Guid id, CancellationToken ct);
    Task<QuizDto?> GetLatestPublishedQuizAsync(CancellationToken ct);
    Task<IEnumerable<QuizSummaryDTO>> GetAllQuizesAsync(CancellationToken ct);
}