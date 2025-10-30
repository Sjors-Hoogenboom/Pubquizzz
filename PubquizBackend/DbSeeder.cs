using Microsoft.EntityFrameworkCore;
using PubquizBackend.Data;
using PubquizBackend.Models.Entities;
using Microsoft.AspNetCore.Identity; 

namespace PubquizBackend;

public static class DbSeeder
{
    public static async Task SeedAsync(PubquizDbContext db)
    {
        await SeedUsersAsync(db);
        await SeedQuizAsync(db);
    }
    
    private static async Task SeedUsersAsync(PubquizDbContext db)
    {
        if (await db.Users.AnyAsync()) return;

        var hasher = new PasswordHasher<User>();

        var user = new User
        {
            UserId = Guid.NewGuid(),
            DisplayName = "Player One",
            Email = "user@email.com",
            CreationDate = DateTime.UtcNow
        };
        user.PasswordHash = hasher.HashPassword(user, "User!123");
        user.Roles.Add(new UserRole { UserId = user.UserId, Role = Role.User, User = user });

        var admin = new User
        {
            UserId = Guid.NewGuid(),
            DisplayName = "Admin",
            Email = "admin@email.com",
            CreationDate = DateTime.UtcNow
        };
        admin.PasswordHash = hasher.HashPassword(admin, "Admin!123");
        admin.Roles.Add(new UserRole { UserId = admin.UserId, Role = Role.Admin, User = admin });

        var host = new User
        {
            UserId = Guid.NewGuid(),
            DisplayName = "Host Creator",
            Email = "host@email.com",
            CreationDate = DateTime.UtcNow
        };
        host.PasswordHash = hasher.HashPassword(host, "HostCreator!123");
        host.Roles.Add(new UserRole { UserId = host.UserId, Role = Role.Host, User = host });
        
        var creator = new User
        {
            UserId = Guid.NewGuid(),
            DisplayName = "Admin",
            Email = "creator@email.com",
            CreationDate = DateTime.UtcNow
        };
        creator.PasswordHash = hasher.HashPassword(creator, "Creator!123");
        creator.Roles.Add(new UserRole { UserId = creator.UserId, Role = Role.Creator, User = creator });

        db.Users.AddRange(user, admin, host, creator);
        await db.SaveChangesAsync();
    }
    
     private static async Task SeedQuizAsync(PubquizDbContext db)
    {
        if (await db.Pubquizes.AnyAsync()) return;

        var quizId = Guid.NewGuid();
        var q1Id = Guid.NewGuid();
        var q2Id = Guid.NewGuid();

        var q1 = new Question
        {
            QuestionId = q1Id,
            CreatorId = Guid.NewGuid(),
            QuestionType = QuestionType.SingleChoice,
            QuestionText = "What is the capital of France?",
            Points = 1000,
            TimeLimit = 20,
            AnswerOptions = new List<AnswerOption>
            {
                new() { AnswerOptionId = Guid.NewGuid(), QuestionId = q1Id, Text = "Paris", IsCorrect = true },
                new() { AnswerOptionId = Guid.NewGuid(), QuestionId = q1Id, Text = "Lyon",  IsCorrect = false },
                new() { AnswerOptionId = Guid.NewGuid(), QuestionId = q1Id, Text = "Nice",  IsCorrect = false },
                new() { AnswerOptionId = Guid.NewGuid(), QuestionId = q1Id, Text = "Marseille", IsCorrect = false },
            }
        };

        var q2 = new Question
        {
            QuestionId = q2Id,
            CreatorId = Guid.NewGuid(),
            QuestionType = QuestionType.MultipleChoice,
            QuestionText = "Pick the even numbers.",
            Points = 1000,
            TimeLimit = 20,
            AnswerOptions = new List<AnswerOption>
            {
                new() { AnswerOptionId = Guid.NewGuid(), QuestionId = q2Id, Text = "2", IsCorrect = true },
                new() { AnswerOptionId = Guid.NewGuid(), QuestionId = q2Id, Text = "3", IsCorrect = false },
                new() { AnswerOptionId = Guid.NewGuid(), QuestionId = q2Id, Text = "4", IsCorrect = true },
                new() { AnswerOptionId = Guid.NewGuid(), QuestionId = q2Id, Text = "5", IsCorrect = false },
            }
        };

        var quiz = new Pubquiz
        {
            PubquizId = quizId,
            CreatorId = Guid.NewGuid(),
            Title = "General Knowledge #1",
            Description = "Warm-up round",
            CreationDate = DateTime.UtcNow,
            IsPublished = true,
            PubquizQuestions = new List<PubquizQuestion>
            {
                new() { PubquizId = quizId, QuestionId = q1Id, Order = 1 },
                new() { PubquizId = quizId, QuestionId = q2Id, Order = 2 },
            }
        };

        db.Questions.AddRange(q1, q2);
        db.Pubquizes.Add(quiz);
        await db.SaveChangesAsync();
    }
}