import express from "express";

import { createStore, findStore, getStore } from "../controllers/store.js";

const router = express.Router();

router.post("/", createStore);
router.get("/find/:userId", findStore);

export default router;
