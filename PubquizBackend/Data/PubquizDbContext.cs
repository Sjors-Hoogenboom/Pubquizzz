using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Data;

public class PubquizDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public DbSet<Pubquiz> Pubquizzes { get; set; } = null!;
    public DbSet<GameSession> GameSessions { get; set; } = null!;
    public DbSet<GameParticipant> GameParticipants { get; set; } = null!;
    public DbSet<Question> Questions { get; set; } = null!;
    
    public DbSet<AnswerOption> AnswerOptions { get; set; } = null!;
    public DbSet<PubquizQuestion> PubquizQuestions { get; set; } = null!;

    public PubquizDbContext(DbContextOptions<PubquizDbContext> dbContextOptions)
    : base(dbContextOptions)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ApplicationUser>(b =>
        {
            b.Property(u => u.DisplayName)
                .IsRequired()
                .HasMaxLength(128);
        });
        
        modelBuilder.Entity<GameParticipant>(entity =>
        {
            entity.HasKey(p => new { p.GameId, p.UserId });
            entity.HasOne(gp => gp.GameSession)
                .WithMany()
                .HasForeignKey(gp => gp.GameId)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(gp => gp.User)
                .WithMany()
                .HasForeignKey(gp => gp.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        modelBuilder.Entity<PubquizQuestion>()
            .HasKey(pq => new { pq.PubquizId, pq.QuestionId });

        modelBuilder.Entity<PubquizQuestion>()
            .HasOne(pq => pq.Pubquiz)
            .WithMany(p => p.PubquizQuestions)
            .HasForeignKey(pq => pq.PubquizId);
        
        modelBuilder.Entity<PubquizQuestion>()
            .HasOne(pq => pq.Question)
            .WithMany()
            .HasForeignKey(pq => pq.QuestionId);
        
        modelBuilder.Entity<AnswerOption>()
            .HasOne(a => a.Question)
            .WithMany(q => q.AnswerOptions)
            .HasForeignKey(a => a.QuestionId);
    }
}