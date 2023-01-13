import express from "express";

import { createProduct } from "../controllers/product.js";

const router = express.Router();

router.get("/main", createProduct);
router.get("/categories", createProduct);

export default router;
