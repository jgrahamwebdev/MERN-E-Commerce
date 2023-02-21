
import express from "express";
const router = express.Router()
import { getProducts, getProductById } from "../controllers/productController.js";

//For ALL Products
router.route('/').get(getProducts)

//For ONE Product
router.route('/:id').get(getProductById)


export default router



