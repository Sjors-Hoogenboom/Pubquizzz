namespace PubquizBackend.Models.Entities;

public class PubquizQuestion
{
    public Guid PubquizId { get; set; }
    public Guid QuestionId { get; set; }
    public int Order { get; set; }

    public Pubquiz Pubquiz { get; set; } = default!;
    public Question Question { get; set; } = default!;
}