import { Router } from "express";
import {
  getTransations,
  createTransation,
} from "../controllers/transations.controller.js";
const router = Router();

router.get("/users/:id/transations", getTransations);
router.post("/users/:id/transations", createTransation);

export default router;
