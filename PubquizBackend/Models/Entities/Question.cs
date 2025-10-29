namespace PubquizBackend.Models.Entities;

public class Question
{
    public Guid QuestionId { get; set; }
    public Guid CreatorId { get; set; }
    public QuestionType QuestionType { get; set; }
    public string QuestionText { get; set; } = default!;
    public string? QuestionDescription { get; set; }
    public int Points { get; set; } = 1000;
    public int TimeLimit { get; set; } = 20;

    public ICollection<AnswerOption> AnswerOptions { get; set; } = new List<AnswerOption>();
}


public enum QuestionType
{
    MultipleChoice,
    SingleChoice,
    Estimate,
    Text
}