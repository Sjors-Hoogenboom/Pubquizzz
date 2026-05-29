using System.Text;

namespace PubquizBackend.Configuration;

public static class JwtKeyHelper
{
    public static byte[] GetJwtKeyBytes(IConfiguration configuration)
    {
        var key = configuration["Jwt:Key"];

        if (string.IsNullOrWhiteSpace(key))
        {
            throw new InvalidOperationException("Missing JWT key env variable");
        }

        var keyBytes = Encoding.UTF8.GetBytes(key);

        if (keyBytes.Length < 32)
        {
            throw new InvalidOperationException("JWT key must be at least 32 bytes");
        }

        return keyBytes;
    }
}