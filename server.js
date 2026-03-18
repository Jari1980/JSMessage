require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const setupWebSocket = require("./websocket");

const app = express();

//HTTP server manually for websockets
const server = http.createServer(app);

//Middleware
app.use(express.json());

//API routes
app.use("/api", require("./routes/message"));

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  //Setup WebSocket
  setupWebSocket(server);

  //Start server
  const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });