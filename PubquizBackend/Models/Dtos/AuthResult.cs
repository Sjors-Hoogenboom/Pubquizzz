namespace PubquizBackend.Models;

public class AuthResult
{
    public bool Succeeded { get; init; }
    public bool IsConflict { get; init; }
    public IEnumerable<string> Errors { get; init; } = [];

    public static AuthResult Success() => new()
    {
        Succeeded = true
    };

    public static AuthResult Failed(IEnumerable<string> errors, bool isConflict = false) => new()
    {
        Succeeded = false,
        IsConflict = isConflict,
        Errors = errors
    };
}