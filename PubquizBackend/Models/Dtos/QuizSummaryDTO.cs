namespace PubquizBackend.Models.Dtos;

public record QuizSummaryDTO
(
    Guid PubquizId,
    string Title,
    string? Descriptionm,
    int NumberOfQuestions
);