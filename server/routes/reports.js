import express from "express";

import { getDataDashboard } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/main", getDataDashboard);
router.get("/motion/sales", getDataDashboard);
router.get("/motion/sale", getDataDashboard);
router.get("/motion/commings", getDataDashboard);
router.get("/open-shifts", getDataDashboard);

export default router;
