
import express from "express";
const router = express.Router()
import { authUser, registerUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//For REGISTER user
router.route('/').post(registerUser)
//For AUTHENTICATE user
router.post('/login', authUser)
//Get users profile:
router.route('/profile').get(protect, getUserProfile)


export default router


