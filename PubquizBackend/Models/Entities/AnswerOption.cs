namespace PubquizBackend.Models.Entities;

public class AnswerOption
{
    public Guid AnswerOptionId { get; set; }
    public Guid QuestionId { get; set; }
    public string Text { get; set; } = default!;
    public bool IsCorrect { get; set; }

    public Question Question { get; set; } = default!;
}