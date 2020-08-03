import socketIO from "socket.io";

export default server => {
  const io = socketIO(server);
  io.on("connection", socket => {
    console.log("### CONNECTED ###");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return io;
};
