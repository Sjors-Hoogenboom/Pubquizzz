using Microsoft.EntityFrameworkCore;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Data;

public class PubquizDbContext : DbContext
{
    public DbSet<Pubquiz> Pubquizes { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<GameParticipant> GameParticipants { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GameParticipant>()
            .HasKey(gp => new { gp.GameId, gp.UserId });
        
        modelBuilder.Entity<UserRole>()
            .HasKey(ur => new { ur.UserId, ur.Role });

        base.OnModelCreating(modelBuilder);
    }
    
    public PubquizDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {
        
    }
}