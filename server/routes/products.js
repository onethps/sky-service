import express from "express";

import {
  createProduct,
  deleteProduct,
  findProduct,
  getAllProducts,
  updateProduct,
  updateProducts,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/find/", findProduct);
router.post("/", createProduct);
router.post("/updateProducts", updateProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
