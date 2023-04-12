import { Router } from "express";
import * as articleController from "../controllers/article.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, articleController.createArticle);
router.get("/", authMiddleware, articleController.getArticlesByCompanyId);
router.put("/:articleId", authMiddleware, articleController.updateArticle);
router.delete("/:articleId", authMiddleware, articleController.deleteArticle);

export default router;
