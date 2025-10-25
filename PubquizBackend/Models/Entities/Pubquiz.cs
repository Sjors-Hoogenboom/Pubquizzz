namespace PubquizBackend.Models.Entities;

public class Pubquiz
{
    public Guid PubquizId { get; set; }
    public Guid CreatorId { get; set; }
    public String Title { get; set; }
    public String? Description { get; set; }
    public DateTime CreationDate { get; set; }
    public bool IsPublished { get; set; }
}