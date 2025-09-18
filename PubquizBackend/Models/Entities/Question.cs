namespace PubquizBackend.Models.Entities;

public class Question
{
    public Guid QuestionId { get; set; }
    public Guid CreatorId { get; set; }
    public QuestionType QuestionType { get; set; }
    public string QuestionText { get; set; }
    public string? QuestionDescription { get; set; }
    
}

public enum QuestionType
{
    MultipleChoice,
    SingleChoice,
    Estimate,
    Text
}