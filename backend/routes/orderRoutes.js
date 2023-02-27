
import express from "express";
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

//For ADD ITEMS to database
router.route('/').post(protect, addOrderItems)
//For getting ALL logged in user order(s)
router.route('/myorders').get(protect, getMyOrders)
//For get order by ID
router.route('/:id').get(protect, getOrderById)
//For updating order status to 'Paid'
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router









