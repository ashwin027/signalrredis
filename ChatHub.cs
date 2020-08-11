using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalrRedis
{
    public class ChatHub: Hub
    {
        public async Task NewChatMessage(string chatMessage)
        {
            await Clients.All.SendAsync("ChatMessageReceived", chatMessage);
        }
    }
}
