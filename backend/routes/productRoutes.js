
import express from "express";
const router = express.Router()
import { getProducts, getProductById, deleteProduct } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//For ALL Products
router.route('/').get(getProducts)

//For ONE Product
router.route('/:id').get(getProductById)

//DELETE a Product
router.route('/:id').delete(protect, admin, deleteProduct)


export default router



