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
}