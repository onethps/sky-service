import express from "express";

import { createProduct } from "../controllers/product.js";
import { createStore } from "../controllers/store.js";

const router = express.Router();

router.post("/", createStore);

export default router;
