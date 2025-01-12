const express=require("express")
const router=express.Router()
const {body,query}=require("express-validator")
const rideContoller=require("../contollers/ride.controller")
const authMiddleware=require("../middlewares/auth.middleware")
router.post("/create",
    authMiddleware.authUser,

    body("pickup").isString().isLength({min:3}).withMessage("invalid pickup location"),
    body("destination").isString().isLength({min:3}).withMessage("invalid destination"),
    body("vehicleType").isString().isIn(['auto','car','motorcycle']).withMessage("invalid vehicle"),
    rideContoller.createRide
)
router.get("/get-fare",
    authMiddleware.authUser,
    query("pickup").isString().isLength({min:3}).withMessage("invalid pickup location"),
    query("destination").isString().isLength({min:3}).withMessage("invalid destination"),
    rideContoller.getFare
)
router.post("/confirm",
    authMiddleware.authCaptain,
    body("rideId").isString().isLength({min:24}).withMessage("invalid ride id"),
    rideContoller.confirmRide
)
router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideContoller.startRide,
)
router.post("/end-ride",
    authMiddleware.authCaptain,
    body("rideId").isString().isLength({min:24}).withMessage("invalid ride id"),
    rideContoller.endRide
)



module.exports=router