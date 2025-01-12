const express=require("express")
const router=express.Router()
router.get("/get-coordinates",)
const authMiddleware=require("../middlewares/auth.middleware")
const mapContoller=require("../contollers/maps.controller")
const {query} =require("express-validator")

router.get("/get-coordinates",authMiddleware.authUser,mapContoller.getCoordinates)
router.get("/get-distance-time",
    query("origins").isString().isLength({min:3}),
    query("destinations").isString().isLength({min:3}),
    authMiddleware.authUser,
    mapContoller.getDistanceTime
)
router.get("/get-suggestions",
    query("input").isString().isLength({min:3}),
    authMiddleware.authUser,
    mapContoller.getAutoCompleteSuggestions
)

module.exports=router;