import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/users.controller.js";
const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.put("/users/:id", updateUser);

export default router;
