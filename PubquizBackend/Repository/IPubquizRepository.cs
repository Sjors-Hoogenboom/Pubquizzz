using PubquizBackend.Models.Entities;

namespace PubquizBackend.Repository;

public interface IPubquizRepository
{
    Task<Pubquiz?> GetPublishedByIdAsync(Guid id, CancellationToken ct);
    Task<Pubquiz?> GetLatestPublishedAsync(CancellationToken ct);
    Task<IEnumerable<Pubquiz>> GetAllPublishedAsync(CancellationToken ct);
}