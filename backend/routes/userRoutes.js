
import express from "express";
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//For REGISTER user
router.route('/').post(registerUser)
//For get ALL users
router.route('/').get(protect, admin, getUsers)
//For AUTHENTICATE user
router.post('/login', authUser)
//Get users profile:
router.route('/profile').get(protect, getUserProfile)
//Update users profile:
router.route('/profile').put(protect, updateUserProfile)

export default router


