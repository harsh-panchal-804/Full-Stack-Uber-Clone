const express=require("express");
const router=express.Router();
const {body}=require("express-validator")
const userController=require("../contollers/user.controller");
const authMiddleWare=require("../middlewares/auth.middleware");    


router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname").isLength({min:3}).withMessage("Name must be atleast 3 characters long"),
    body("password").isLength({min:5}).withMessage("Password must be atleast 5 characters long"),
],userController.registerUser);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:5}).withMessage("Password must be atleast 5 characters long")

],userController.loginUser);
router.get("/profile",authMiddleWare.authUser,userController.getUserProfile);

router.get("/logout",authMiddleWare.authUser,userController.logoutUser);

module.exports=router;