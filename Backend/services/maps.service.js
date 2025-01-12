const axios = require('axios');
const captainModel = require("../db/Models/captain.model");
module.exports.getAddressCoordinate = async ( address ) => {
    if (!address) {
        throw new Error("Address is required");
    }

    const apiKey = process.env.MAPS_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== 'OK') {
            throw new Error("Failed to fetch coordinates")
        }

        const location = data.results[0].geometry.location;
        return {
            latitude: location.lat,
            longitude: location.lng
        };
    } catch (error) {
        console.log(error.message);
        throw new Error("Error fetching coordinates: " + error.message);
    }
};
module.exports.getDistanceTime =async (origins,destinations)=>{
    if(!origins || !destinations){
        throw new Error("Origin/Destination cant be null")
    }
    const apiKey = process.env.MAPS_API_KEY
    const baseURL = "https://maps.gomaps.pro/maps/api/distancematrix/json";
    const url = `${baseURL}?key=${apiKey}&origins=${encodeURIComponent(origins)}&destinations=${encodeURIComponent(destinations)}`;
    try{
        const response=await axios.get(url);
        if(response.data.status==='OK'){
            if(response.data.rows[0].elements[0].status==='ZERO_RESULTS'){
                throw new Error("No route found")
            }
            return response.data.rows[0].elements[0];
        }
        else{
            throw new Error("Failed to fetch distance and time");
        }
    }
    catch(err){
        console.log(err.message)
        throw new Error("Error fetching distance: "+err.message)
    }
    
}
module.exports.getAutoCompleteSuggestions =async (input)=>{
    if(!input){ 
        throw new Error("Input is null")
    }
  
    const key = process.env.MAPS_API_KEY
    const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(input)}&key=${key}`;

    try{
        const response=await axios.get(url)
        if(response.data.status==='OK'){
            return response.data.predictions
            }
        else{
            throw new Error("Failed to fetch suggestions")
        }

    }
    catch(err){
        console.log(err)
        throw new Error("Error fetching suggestions: "+err.message)
    }
}
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    //// radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ ltd, lng ], radius/6371]
            }
        }
    }); 
    return captains;
}