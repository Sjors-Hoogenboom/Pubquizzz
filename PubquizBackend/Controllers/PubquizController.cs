using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PubquizBackend.Data;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Helpers;

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
    
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<QuizDto>> GetFullQuiz(Guid id)
    {
        var quiz = await _dbContext.Pubquizes
            .AsNoTracking()
            .Where(p => p.PubquizId == id && p.IsPublished)
            .Include(p => p.PubquizQuestions)
            .ThenInclude(pq => pq.Question)
            .ThenInclude(q => q.AnswerOptions)
            .FirstOrDefaultAsync();

        if (quiz is null) return NotFound();
        
        return Ok(quiz.ToDto());
    }

    [HttpGet("/latest")]
    public async Task<ActionResult<QuizDto>> GetLatestPublishedQuiz()
    {
        var quiz = await _dbContext.Pubquizes
            .AsNoTracking()
            .Where(p => p.IsPublished)
            .OrderByDescending(p => p.CreationDate)
            .Include(p => p.PubquizQuestions)
            .ThenInclude(pq => pq.Question)
            .ThenInclude(q => q.AnswerOptions)
            .FirstOrDefaultAsync();

        if (quiz is null) return NotFound();

        return Ok(quiz.ToDto());
    }
}