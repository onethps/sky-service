import express from "express";

import { createProduct } from "../controllers/product.js";

const router = express.Router();

router.get("/main", createProduct);
router.get("/motion/sales", createProduct);

export default router;
