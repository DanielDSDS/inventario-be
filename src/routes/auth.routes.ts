import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", authController.loginUser);
router.get("/user", authMiddleware, authController.getUser);

export default router;
