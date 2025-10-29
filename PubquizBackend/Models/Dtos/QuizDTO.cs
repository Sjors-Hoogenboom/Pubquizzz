namespace PubquizBackend.Models.Dtos;

public record QuizDto(
    Guid PubquizId,
    string Title,
    string? Description,
    IReadOnlyList<QuestionDto> Questions
);

public record QuestionDto(
    Guid QuestionId,
    string Text,
    string? Description,
    int Points,
    int TimeLimit,
    IReadOnlyList<AnswerDto> Answers
);

public record AnswerDto(
    Guid AnswerOptionId,
    string Text,
    bool IsCorrect
);