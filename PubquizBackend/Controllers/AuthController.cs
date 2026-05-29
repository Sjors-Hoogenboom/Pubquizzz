using Microsoft.AspNetCore.Mvc;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Service;

namespace PubquizBackend.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController(IAuthService auth) : ControllerBase
{
    [HttpPost("login")]
    [ProducesResponseType(typeof(LoginResponseDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequestDTO req, CancellationToken ct)
    {
        var res = await auth.LoginAsync(req, ct);

        return res is null
            ? Unauthorized("Invalid username/email or password.")
            : Ok(res);
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDTO req, CancellationToken ct)
    {
        var result = await auth.RegisterAsync(req, ct);

        if (result.Succeeded)
        {
            return CreatedAtAction(
                nameof(Register),
                new { username = req.Username },
                new { message = "User was registered." }
            );
        }

        if (result.IsConflict)
        {
            return Conflict(result.Errors);
        }

        return BadRequest(result.Errors);
    }
}