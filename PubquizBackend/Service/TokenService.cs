using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using PubquizBackend.Models.Entities;

namespace PubquizBackend.Service;

public sealed class TokenService : ITokenService
{
    private readonly string _issuer;
    private readonly string _audience;
    private readonly SymmetricSecurityKey _key;
    private readonly int _minutes;

    public TokenService(IConfiguration cfg)
    {
        _issuer = cfg["jwt:issuer"]!;
        _audience = cfg["jwt:audience"]!;
        var key = cfg["jwt:key"] ?? throw new InvalidOperationException("Missing jwt:key");
        byte[] keyBytes;
        try { keyBytes = Convert.FromBase64String(key); }
        catch { keyBytes = Encoding.UTF8.GetBytes(key); }
        _key = new SymmetricSecurityKey(keyBytes);
        _minutes = int.TryParse(cfg["jwt:accessTokenMinutes"], out var m) ? m : 60;
    }

    public (string token, DateTime expiresUtc) Create(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            
            new(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, user.DisplayName),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        
        foreach (var r in user.Roles.Select(x => x.Role.ToString()))
            claims.Add(new Claim(ClaimTypes.Role, r));

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddMinutes(_minutes);

        var jwt = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: expires,
            signingCredentials: creds
        );

        var token = new JwtSecurityTokenHandler().WriteToken(jwt);
        return (token, expires);
    }
}