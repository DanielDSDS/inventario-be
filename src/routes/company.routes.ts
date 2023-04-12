import { Router } from "express";
import * as companyController from "../controllers/company.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, companyController.createCompany);
router.get("/", authMiddleware, companyController.getCompanies);
router.get("/:id", authMiddleware, companyController.getCompanyById);
router.put("/:id", authMiddleware, companyController.updateCompany);
router.delete("/:id", authMiddleware, companyController.deleteCompany);

export default router;
