using PubquizBackend.Repository;
using PubquizBackend.Service;

namespace PubquizBackend.Configuration;

public static class ServiceCollectionExtensions
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IPubquizService, PubquizService>();
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IPubquizRepository, PubquizRepository>();
    }
}