import express from "express";

import {
  createProduct,
  deleteProduct,
  findProduct,
  getAllProducts,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.get("/find/", findProduct);

export default router;
