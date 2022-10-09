import express from "express";

import {
  createProduct,
  createTechCard,
  deleteProduct,
  findProduct,
  getAllProducts,
  getTechCards,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/find/", findProduct);
router.get("/:id/techcards", getTechCards);
router.post("/:id/techcards", createTechCard);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
