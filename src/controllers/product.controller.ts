import { Request, Response } from "express";
import * as productService from "../services/product.services";

export async function createproduct(req: Request, res: Response) {
  const companyId = parseInt(req.params.id);
  const product = await productService.createproduct(companyId, req.body);
  res.status(201).json(product);
}

export async function getproductsByCompanyId(req: Request, res: Response) {
  const companyId = parseInt(req.params.id);
  const products = await productService.getproductsByCompanyId(companyId);
  res.json(products);
}

export async function updateproduct(req: Request, res: Response) {
  const productId = parseInt(req.params.productId);
  const updatedproduct = await productService.updateproduct(productId, req.body);
  res.json(updatedproduct);
}

export async function deleteproduct(req: Request, res: Response) {
  const productId = parseInt(req.params.productId);
  await productService.deleteproduct(productId);
  res.json({ message: "product deleted" });
}
