using System.Text;
using dotenv.net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PubquizBackend;
using PubquizBackend.Configuration;
using PubquizBackend.Data;

DotEnv.Load(new DotEnvOptions(
    envFilePaths: [".env.local", ".env"],
    probeForEnv: true,
    overwriteExistingVars: false
));

var builder = WebApplication.CreateBuilder(args);

var jwtSection = builder.Configuration.GetSection("jwt");
var issuer = jwtSection["issuer"];
var audience = jwtSection["audience"];
var key      = builder.Configuration["jwt:key"];

byte[] keyBytes;
try { keyBytes = Convert.FromBase64String(key); }
catch (FormatException) { keyBytes = Encoding.UTF8.GetBytes(key); }

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("frontend", p => p
        .WithOrigins(
            "http://localhost:5173", "http://127.0.0.1:5173",
            "http://localhost:3000", "http://127.0.0.1:3000"
        )
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services.AddServices();
builder.Services.AddRepositories();

builder.Services.AddDbContext<PubquizDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("PubquizConnectionString")));

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapGet("/", () => Results.Redirect("/swagger")).ExcludeFromDescription();
}

app.UseHttpsRedirection();
app.UseCors("frontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PubquizDbContext>();
    await db.Database.MigrateAsync();
    await DbSeeder.SeedAsync(db);
}

app.Run();