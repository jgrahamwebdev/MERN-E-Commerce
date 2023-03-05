
import express from "express";
const router = express.Router()
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//For ALL Products
router.route('/').get(getProducts)

//CREATE new Products
router.route('/').post(protect, admin, createProduct)

//CREATE new REVIEW
router.route('/:id/reviews').post(protect, createProductReview)

//For ONE Product
router.route('/:id').get(getProductById)

//DELETE a Product
router.route('/:id').delete(protect, admin, deleteProduct)

//UPDATE a Product
router.route('/:id').put(protect, admin, updateProduct)


export default router



