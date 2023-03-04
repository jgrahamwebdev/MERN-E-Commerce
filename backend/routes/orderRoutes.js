
import express from "express";
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//For ADD ITEMS to database
router.route('/').post(protect, addOrderItems)
//Get ALL orders (Admin ONLY)
router.route('/').get(protect, admin, getOrders)
//For getting ALL logged in user order(s)
router.route('/myorders').get(protect, getMyOrders)
//For get order by ID
router.route('/:id').get(protect, getOrderById)
//For updating order status to 'Paid'
router.route('/:id/pay').put(protect, updateOrderToPaid)
//For updating order status to 'Delivered'
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)


export default router









