const dotenv=require("dotenv").config()
const userRoutes=require("./routes/user.routes")
const captainRoutes=require("./routes/captain.routes")
const cookieParser=require("cookie-parser")
const express=require("express")
const cors=require("cors")
const app=express();
const connectToDB=require("./db/db");
const mapsRoutes=require("./routes/map.routes")
const rideRoutes=require("./routes/ride.routes")


connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));  
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send("Hello world")
});
app.use("/users",userRoutes);
app.use("/captains",captainRoutes);
app.use("/maps",mapsRoutes)
app.use("/rides",rideRoutes)

module.exports=app;
