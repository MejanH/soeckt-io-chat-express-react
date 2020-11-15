const app = require("express")();
// why http? because socketio requires it
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  // enable cors policy so that the frontend host can retrieve data
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // just named a connection message so that we can use it on frontend
  socket.on("message", ({ name, message }) => {
    // this emit method sends the data from server
    io.emit("message", { name, message });
  });
});

http.listen(5000, function () {
  console.log("Running on 5000");
});
