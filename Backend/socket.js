const { Server } = require("socket.io");
const userModel = require("./db/Models/user.model");
const captainModel = require("./db/Models/captain.model");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
    


  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.on("join",async (data)=>{
        const {userId,userType}=data;
        console.log(`User ${userId} joined as ${userType}`)
       
        if(userType==="user"){
            await userModel.findByIdAndUpdate(userId,{
                socketId:socket.id
            })
        }
        else if(userType==="captain"){
            await captainModel.findByIdAndUpdate(userId,{
                socketId:socket.id
            })
        }
    });
    socket.on("update-location-captain",async (data)=>{
        const {userId,location}=data;
        if(!location ||!location.ltd || !location.lng){
            return socket.emit("error","Invalid location")
        }
        
        await captainModel.findByIdAndUpdate(userId,{
            location:{
                ltd:location.ltd,
                lng:location.lng
            }
        })
    });
    socket.on("destination-coordinates",(data)=>{
      io.emit("destination-coordinates",data)
    })
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io is not initialized");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId
};