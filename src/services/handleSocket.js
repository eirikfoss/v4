import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4001");

function emitGoal(data) {
  socket.emit("goal", data);
  console.log("Data sendt: ", data);
}

export { emitGoal };
