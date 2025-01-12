const captainModel = require("../db/Models/captain.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.createCaptain = async ({firstname, lastname, email, password,color,plate,capacity,vehicleType}) => {   
    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType){
        console.log({
            firstname,
            lastname,
            email,
            password,
            color,
            plate,
            capacity,
            vehicleType
        })
        throw new Error("All fields are required");
    }
    const captain=await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}
