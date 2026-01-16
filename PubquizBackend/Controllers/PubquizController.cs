using Microsoft.AspNetCore.Mvc;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Service;

namespace PubquizBackend.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class PubquizController : ControllerBase
{
    private readonly IPubquizService _service;

    public PubquizController(IPubquizService service)
    {
        _service = service;
    }
    
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(QuizDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<QuizDto>> GetFullQuiz(Guid id, CancellationToken ct)
    {
        var dto = await _service.GetFullQuizAsync(id, ct);
        if (dto is null) return NotFound();
        return Ok(dto);
    }

    [HttpGet("latest")]
    [ProducesResponseType(typeof(QuizDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<QuizDto>> GetLatestPublishedQuiz(CancellationToken ct)
    {
        var dto = await _service.GetLatestPublishedQuizAsync(ct);
        if (dto is null) return NotFound();
        return Ok(dto);
    }

    [HttpGet("all")]
    [ProducesResponseType(typeof(IEnumerable<QuizDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<QuizDto>> GetAllPublishedQuiz(CancellationToken ct)
    {
        var dtos = await _service.GetAllQuizesAsync(ct);
        return Ok(dtos);
    }
}