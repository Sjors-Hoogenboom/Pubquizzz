using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using PubquizBackend.Service;

namespace PubquizBackend.Hubs;

public class GameHub : Hub
{
    private readonly IGameManagerService _gameManagerService;

    public GameHub(IGameManagerService gameManagerService)
    {
        _gameManagerService = gameManagerService;
    }

    public async Task JoinRoom(string roomCode, string nickname)
    {
        roomCode = roomCode.ToUpper();

        if (!_gameManagerService.RoomExists(roomCode))
        {
            await Clients.Caller.SendAsync("Error", "Room Not Found");
            return;
        }
        
        await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

        await Clients.Group(roomCode).SendAsync("PlayerJoined", nickname);
    }

    public async Task JoinAsHost(string roomCode)
    {
        roomCode = roomCode.ToUpper();
        
        var userIdStr = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out Guid userId)) 
        {
           await Clients.Caller.SendAsync("Error", "User not found or invalid");
           return;
        }

        if (!_gameManagerService.IsHost(roomCode, userId))
        {
            await Clients.Caller.SendAsync("Error", "User is not a host");
            return;
        }
        
        await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
        
        await Clients.Caller.SendAsync("HostConnected");
    }
}