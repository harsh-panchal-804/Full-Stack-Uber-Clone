const rideService = require("../services/ride.services")
const { validationResult } = require("express-validator")
const mapService=require("../services/maps.service")
const {sendMessageToSocketId}=require("../socket")
const rideModel = require("../db/Models/ride.model")
module.exports.createRide = async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({ message: erros.array() })
    }
    const { userID, pickup, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType })
        const pickupCoordinates=await mapService.getAddressCoordinate(pickup)
        console.log(pickupCoordinates)
        const captainsInRadius=await mapService.getCaptainsInTheRadius(pickupCoordinates.latitude,pickupCoordinates.longitude,2)
        if(captainsInRadius.length===0){
            return res.status(201).json({
                message:"No captain found in the radius"
            })
        }
        res.status(201).json({ ride })
        ride.otp=""
        const rideWithUser=await rideModel.findOne({_id:ride._id}).populate("user")
       
        captainsInRadius.map(async (captain)=>{
            sendMessageToSocketId(captain.socketId,{
                event:"new-ride",
                data:{
                    ride:rideWithUser
                }
            })
        })
        
        
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }


}
module.exports.getFare = async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({ message: erros.array() })
    }
    const { pickup, destination } = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination)
        return res.status(200).json( fare )
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }

}
module.exports.confirmRide = async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        console.log("in controller")
        return res.status(400).json({ message: erros.array() })
    }
    console.log(req.body)
    const { rideId,captainId } = req.body;
    try {
        const ride = await rideService.confirmRide(rideId,captainId)
        if(!ride){
            console.log("in controller 3")
            throw new Error("Ride not found")
        }
        sendMessageToSocketId(ride.user.socketId,{
            event:"ride-confirmed",
            data:ride
        })
        return res.status(200).json(ride)
    }
    catch (err) {
        console.log("in controller 2")
        return res.status(500).json({ message: err.message })
    }
}
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideService.endRide({ rideId , captain:req.captain})
        if(!ride){
            throw new Error("Ride not found")
        }
        sendMessageToSocketId(ride.user.socketId,{
            event:"ride-ended",
            data:ride
        })
        
        return res.status(200).json(ride)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}