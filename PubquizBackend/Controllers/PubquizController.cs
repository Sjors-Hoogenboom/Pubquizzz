using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PubquizBackend.Data;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Helpers;
using PubquizBackend.Service;

namespace PubquizBackend.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
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
}