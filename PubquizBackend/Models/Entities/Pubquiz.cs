namespace PubquizBackend.Models.Entities;

public class Pubquiz
{
    public Guid PubquizId { get; set; }
    public Guid CreatorId { get; set; }
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public DateTime CreationDate { get; set; }
    public bool IsPublished { get; set; }

    public ICollection<PubquizQuestion> PubquizQuestions { get; set; } = new List<PubquizQuestion>();
}
