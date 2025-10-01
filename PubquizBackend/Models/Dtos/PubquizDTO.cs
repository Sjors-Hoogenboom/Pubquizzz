namespace PubquizBackend.Models.Dtos;

public class PubquizDTO
{
    public Guid PubquizId { get; set; }
    public Guid CreatorId { get; set; }
    public String Title { get; set; }
    public String? Description { get; set; }
    public DateTime CreationDate { get; set; }
}