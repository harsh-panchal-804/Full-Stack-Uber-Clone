const rideModel = require("../db/Models/ride.model");
const mapService = require("../services/maps.service");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Missing pickup or destination");
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    console.log("distanceTime")
    console.log(distanceTime)
    
    const baseFare = {
        car: 50,
        auto: 30,
        motorcycle: 20
    };

    const perKmRate = {
        car: 10,
        auto: 8,
        motorcycle: 5
    };
    const perMinuteRate = {
        car: 2,
        auto: 1.5,
        motorcycle: 1
    };
    const fare={
        auto: Math.round(baseFare.auto +((distanceTime.distance.value/1000) *perKmRate.auto) +((distanceTime.duration.value/60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car +((distanceTime.distance.value/1000) *perKmRate.car) + ((distanceTime.duration.value/60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle +((distanceTime.distance.value/1000) *perKmRate.motorcycle) + ((distanceTime.duration.value/60) * perMinuteRate.motorcycle))
    }
    return fare
}
module.exports.getFare=getFare;
module.exports.createRide = async ({user,pickup,destination,vehicleType}) => {

    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("Missing user, pickup, destination or vehicle type")
        }
    const fare= await getFare(pickup,destination);
    
    const ride=rideModel.create({
        user,
        pickup,
        destination,
        otp:getOTP(6),
        fare:fare[vehicleType]
    })
    return ride

    
};
function getOTP(num){
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}
module.exports.confirmRide=async (rideId,captainId)=>{
    if(!rideId ){
        throw new Error("Missing ride id")
    }
    await rideModel.findOneAndUpdate({_id:rideId},{status:"accepted",
        captain:captainId
    })
    const ride=await rideModel.findOne({_id:rideId}).populate("user").populate("captain").select("+otp")
    if(!ride){
        throw new Error("Ride not found")
    }
    return ride
}
module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })
    return ride;
}
module.exports.endRide = async ({rideId,captain})=>{
    if(!rideId){
        throw new Error("Missing ride id")
    }
    const ride=await rideModel.findOne({_id:rideId}).populate("user").populate("captain").select("+otp")
    if(!ride){
        throw new Error("Ride not found")
    }
    if(ride.status!=="ongoing"){
        throw new Error("Ride not ongoing")
    }
    await rideModel.findOneAndUpdate({_id:rideId},{status:"completed"})
    return ride
       
    
        
}

module.exports.getFare = getFare;