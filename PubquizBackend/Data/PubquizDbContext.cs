using Microsoft.EntityFrameworkCore;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Data;

public class PubquizDbContext : DbContext
{
    public DbSet<Pubquiz> Pubquizes { get; set; } = default!;
    public DbSet<User> Users { get; set; } = default!;
    public DbSet<UserRole> UserRoles { get; set; } = default!;
    public DbSet<Game> Games { get; set; } = default!;
    public DbSet<GameParticipant> GameParticipants { get; set; } = default!;
    public DbSet<Question> Questions { get; set; } = default!;
    
    public DbSet<AnswerOption> AnswerOptions { get; set; } = default!;
    public DbSet<PubquizQuestion> PubquizQuestions { get; set; } = default!;
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<GameParticipant>()
            .HasKey(gp => new { gp.GameId, gp.UserId });

        modelBuilder.Entity<UserRole>()
            .HasKey(ur => new { ur.UserId, ur.Role });
        
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
    
    public PubquizDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {
        
    }
}