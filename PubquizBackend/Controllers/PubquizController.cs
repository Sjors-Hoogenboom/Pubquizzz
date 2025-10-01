using Microsoft.AspNetCore.Mvc;
using PubquizBackend.Data;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class PubquizController : ControllerBase
{
    private readonly PubquizDbContext _dbContext;

    public PubquizController(PubquizDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpGet]
    public IActionResult GetAllPubquizes()
    {
        var pubquizes = _dbContext.Pubquizes.ToList();
        
        var pubquizesDto = new List<PubquizDTO>();
        foreach (var pubquiz in pubquizes)
        {
            pubquizesDto.Add(new PubquizDTO()
            {
                PubquizId = pubquiz.PubquizId,
                CreatorId = pubquiz.CreatorId,
                Title = pubquiz.Title,
                Description = pubquiz.Description,
                CreationDate = pubquiz.CreationDate,
            });
        }
        
        return Ok(pubquizesDto);
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult GetPubquizById(Guid id)
    {
        var pubquiz = _dbContext.Pubquizes.Find(id);

        if (pubquiz == null)
        {
            return NotFound();
        }

        var pubquizDto = new PubquizDTO()
        {
            PubquizId = pubquiz.PubquizId,
            CreatorId = pubquiz.CreatorId,
            Title = pubquiz.Title,
            Description = pubquiz.Description,
            CreationDate = pubquiz.CreationDate,
        };
        
        return Ok(pubquizDto);
    }

    [HttpPost]
    public IActionResult CreatePubquiz(CreatePubquizDTO createPubquizDto)
    {
        var pubquiz = new Pubquiz()
        {
            Title = createPubquizDto.Title,
            Description = createPubquizDto.Description,
        };
        
        _dbContext.Pubquizes.Add(pubquiz);
        _dbContext.SaveChanges();

        var pubquizDto = new PubquizDTO()
        {
            PubquizId = pubquiz.PubquizId,
            Title = pubquiz.Title,
            Description = pubquiz.Description,
        };
        
        return CreatedAtAction(nameof(GetPubquizById), new { id = pubquiz.PubquizId }, pubquizDto);
    }

    [HttpPut("{id}")]
    public IActionResult UpdatePubquiz(Guid id, UpdatePubquizDTO updatePubquizDto)
    {
        var pubquiz = _dbContext.Pubquizes.Find(id);

        if (pubquiz == null)
        {
            return NotFound();   
        }
        
        pubquiz.Title = updatePubquizDto.Title;
        pubquiz.Description = updatePubquizDto.Description;
        
        _dbContext.SaveChanges();

        var pubquizDto = new PubquizDTO()
        {
            PubquizId = pubquiz.PubquizId,
            Title = pubquiz.Title,
            Description = pubquiz.Description,
            CreatorId = pubquiz.CreatorId,
            CreationDate = pubquiz.CreationDate
        };
        
        return Ok(pubquizDto);
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePubquiz(Guid id)
    {
        var pubquiz = _dbContext.Pubquizes.Find(id);

        if (pubquiz == null)
        {
            return NotFound();
        }
        
        _dbContext.Pubquizes.Remove(pubquiz);
        _dbContext.SaveChanges();
        
        return Ok();
    }
}