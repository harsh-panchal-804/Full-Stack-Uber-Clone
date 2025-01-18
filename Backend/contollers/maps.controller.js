const { validationResult } = require("express-validator");
const mapService=require("../services/maps.service")
const axios=require("axios")
module.exports.getCoordinates=async (req,res,next)=>{
    const address=req.query;
    try{
        const coordinates=await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Server error in map controller"})
        
    }
}
module.exports.getDistanceTime= async (req,res,next)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({message:"Invalid input",errors:error.array()});
            }
        const {origins,destinations}=req.query;
        const distanceTime=await mapService.getDistanceTime(origins,destinations)
        res.status(200).json(distanceTime)
    }
    catch(err){
        res.status(500).json({message:"Server error in map controller"})
    }
}
module.exports.getAutoCompleteSuggestions=async (req,res,next)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({message:"Invalid input",errors:error.array()});
        }
        const {input}=req.query;
       
        const suggestions=await mapService.getAutoCompleteSuggestions(input)
      
        res.status(200).json(suggestions)

    }
    catch(err){
        res.status(500).json({message:"Server error ssgsgsg in map controller"})
    }
}