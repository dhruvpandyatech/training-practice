import express from "express";

import {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct
} from "../controllers/productController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/create",
    authMiddleware,
    createProduct
);

router.get(
    "/",
    getProducts
);

router.get(
    "/:id",
    getSingleProduct
);

router.delete(
    "/:id",
    authMiddleware,
    deleteProduct
);

export default router;