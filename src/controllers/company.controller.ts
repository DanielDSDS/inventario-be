import { Request, Response } from "express";
import * as companyService from "../services/company.services";

export async function createCompany(req: Request, res: Response) {
  const company = await companyService.createCompany(req.body);
  res.status(201).json(company);
}

export async function getCompanies(req: Request, res: Response) {
  const companies = await companyService.getCompanies();
  res.json(companies);
}

export async function getCompanyById(req: Request, res: Response) {
  const company = await companyService.getCompanyById(parseInt(req.params.id));
  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }
  res.json(company);
}

export async function updateCompany(req: Request, res: Response) {
  const company = await companyService.updateCompany(parseInt(req.params.id), req.body);
  res.json(company);
}

export async function deleteCompany(req: Request, res: Response) {
  await companyService.deleteCompany(parseInt(req.params.id));
  res.json({ message: "Company deleted" });
}
