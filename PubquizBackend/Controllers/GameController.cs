using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Enums;
using PubquizBackend.Service;

namespace PubquizBackend.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class GameController : ControllerBase
{
    private readonly IGameManagerService _gameManagerService;
    private readonly IGameService _gameService;

    public GameController(IGameManagerService gameManagerService, IGameService gameService)
    {
        _gameManagerService = gameManagerService;
        _gameService = gameService;
    }

    [HttpPost("create/{quizId}")]
    [Authorize]
    [ProducesResponseType(typeof(GameDTO), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateGame(Guid quizId)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdStr, out var hostId)) return Unauthorized();
        
        var code = await _gameManagerService.CreateGameAsync(hostId, quizId);
        
        await _gameService.CreateGameSessionAsync(hostId, quizId,code);

        return Created("", new GameDTO
        {
            RoomCode = code,
            HostId = hostId,
            QuizTitle = "test"
        });
    }
}