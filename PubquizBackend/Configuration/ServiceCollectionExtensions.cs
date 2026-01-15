using PubquizBackend.Repository;
using PubquizBackend.Service;

namespace PubquizBackend.Configuration;

public static class ServiceCollectionExtensions
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IPubquizService, PubquizService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IGameManagerService, GameManagerService>();
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IPubquizRepository, PubquizRepository>();
        services.AddScoped<IAuthRepository, AuthRepository>();
    }
}