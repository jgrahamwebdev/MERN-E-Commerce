
import express from "express";
const router = express.Router()
import { addOrderItems } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

//For ADD ITEMS to database
router.route('/').post(protect, addOrderItems)

export default router


