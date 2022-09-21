import express from "express";

import { getDataDashboard } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/all", getDataDashboard);
router.get("/sklad", getDataDashboard);
router.get("/routings", getDataDashboard);
router.get("/sales", getDataDashboard);
router.get("/remains", getDataDashboard);

export default router;
