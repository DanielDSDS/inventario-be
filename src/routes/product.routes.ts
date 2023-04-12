import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, productController.createproduct);
router.get("/", authMiddleware, productController.getproductsByCompanyId);
router.put("/:productId", authMiddleware, productController.updateproduct);
router.delete("/:productId", authMiddleware, productController.deleteproduct);

export default router;
