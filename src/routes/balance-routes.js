import { Router } from "express";
import { getBalance, updateBalance } from "../controllers/balance.controller.js";
const router = Router();

router.get("/users/:id/balance", getBalance);
router.put("/users/:id/balance", updateBalance);

export default router;
