const WebSocket = require("ws");
const Message = require("./models/Message");

function setupWebSocket(server){
    //Attach WebSocket server to same HTTP server
    const wsServer = new WebSocket.Server({server});

    //Runs when client connects
    wsServer.on("connection", (client) => {
        console.log("Client connected");

        //Runs when client sends a message
        client.on("message", async (data) => {
            try {
                const text = data.toString();

                //Save to db
                const message = await Message.create({text});

                //Broadcast to all connected clients
                wsServer.clients.forEach(client => {
                    if(client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify(message));
                    }
                });
            } catch(err) {
                console.log(err);
            }
        });
        client.on("close", () => {
            console.log("Client disconnected");
        });
    });
}

module.exports = setupWebSocket;