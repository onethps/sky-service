import express from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
