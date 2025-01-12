// filepath: /C:/Users/Harsh/Desktop/Uber/Backend/routes/captain.routes.js
const express = require('express');
const router = express.Router();
const captainController = require("../contollers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name must be atleast 3 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be atleast 3 characters long'),
    body('vehicle.capacity').isNumeric({ min: 1 }).withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'motorcycle']).withMessage('Vehicle type must be atleast 3 characters long'),
], captainController.registerCaptain);
router.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be atleast 5 characters long") 
], captainController.loginCaptain);

router.get("/profile",authMiddleware.authCaptain ,captainController.getCaptainProfile);

router.get("/logout",authMiddleware.authCaptain,captainController.logoutCaptain);












module.exports = router;