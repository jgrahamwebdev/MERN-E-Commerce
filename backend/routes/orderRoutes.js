
import express from "express";
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

//For ADD ITEMS to database
router.route('/').post(protect, addOrderItems)
//For get order by ID
router.route('/:id').get(protect, getOrderById)
//For updating order status to 'Paid'
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router









