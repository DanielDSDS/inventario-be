import { Request, Response } from "express";
import * as articleService from "../services/article.services";

export async function createArticle(req: Request, res: Response) {
  const companyId = parseInt(req.params.id);
  const article = await articleService.createArticle(companyId, req.body);
  res.status(201).json(article);
}

export async function getArticlesByCompanyId(req: Request, res: Response) {
  const companyId = parseInt(req.params.id);
  const articles = await articleService.getArticlesByCompanyId(companyId);
  res.json(articles);
}

export async function updateArticle(req: Request, res: Response) {
  const articleId = parseInt(req.params.articleId);
  const updatedArticle = await articleService.updateArticle(articleId, req.body);
  res.json(updatedArticle);
}

export async function deleteArticle(req: Request, res: Response) {
  const articleId = parseInt(req.params.articleId);
  await articleService.deleteArticle(articleId);
  res.json({ message: "Article deleted" });
}
