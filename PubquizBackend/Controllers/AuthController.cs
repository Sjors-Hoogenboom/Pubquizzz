using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PubquizBackend.Data;
using PubquizBackend.Models.Dtos;
using PubquizBackend.Models.Entities;
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
        return res is null ? Unauthorized() : Ok(res);
    }

    [HttpPost("register")]
    [ProducesResponseType(typeof(LoginResponseDTO), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDTO req, CancellationToken ct)
    {
        var result = await auth.RegisterAsync(req, ct);
        if (result is null) return Conflict("Email is already in use.");

        var (user, token) = result.Value;
        return CreatedAtAction(nameof(Login), new { email = user.Email }, token);
    }
}