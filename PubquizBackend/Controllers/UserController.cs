using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Service;

namespace PubquizBackend.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;

    public UserController(IUserService service)
    {
        _service = service;
    }

    [HttpGet("displayName")]
    [Authorize]
    [ProducesResponseType(typeof(DisplayNameDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DisplayNameDTO>> GetDisplayNameAsync()
    {
        var idString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(idString) || !Guid.TryParse(idString, out Guid id))
        {
            return Unauthorized();
        }
        var dto = await _service.GetDisplayNameAsync(id);
        
        return dto is null ? NotFound() : Ok(dto);
    }
}