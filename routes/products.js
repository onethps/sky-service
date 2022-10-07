import express from "express";

import {
  createProduct,
  deleteProduct,
  findProduct,
  getAllProducts,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/find/", findProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
