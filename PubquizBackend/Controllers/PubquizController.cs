using Microsoft.AspNetCore.Mvc;
using PubquizBackend.Data;

namespace PubquizBackend.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class PubquizController : ControllerBase
{
    private readonly PubquizDbContext _dbContext;

    public PubquizController(PubquizDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpGet]
    public IActionResult GetAllPubquizes()
    {
        var pubquizes = _dbContext.Pubquizes.ToList();
        
        return Ok(pubquizes);
    }
}