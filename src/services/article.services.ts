import SQLDataSource from "..";
import { Product } from "../entities/Product";
import { Company } from "../entities/Company";

/**
 * @description Create a new article
 * @param {number} companyId The ID of the company
 * @param {Partial<Product>} articleData The article data to be created
 * @returns {Promise<Product>} The created article
 */
export async function createArticle(companyId: number, articleData: Partial<Product>): Promise<Product> {
  const productRepository = SQLDataSource.getRepository(Product);
  const company = await SQLDataSource.getRepository(Company).findOneBy({ id: companyId });
  if (!company) {
    throw new Error("Company not found");
  }
  const article = productRepository.create({ ...articleData, company });
  console.log(article)
  await productRepository.save(article);
  return article;
}

/**
 * @description Get articles by company ID
 * @param {number} companyId The ID of the company
 * @returns {Promise<Product[]>} Array of articles
 */
export async function getArticlesByCompanyId(companyId: number): Promise<Product[]> {
  const productRepository = SQLDataSource.getRepository(Product);
  const company = await SQLDataSource.getRepository(Company).findOneBy({ id: companyId });
  if (!company) {
    throw new Error("Company not found");
  }
  const articles = await productRepository.findBy({ company });
  return articles;
}

/**
 * @description Update an article
 * @param {number} articleId The ID of the article to be updated
 * @param {Partial<Product>} articleData The new data for the article
 * @returns {Promise<Product>} The updated article
 */
export async function updateArticle(articleId: number, articleData: Partial<Product>): Promise<Product> {
  const productRepository = SQLDataSource.getRepository(Product);
  await productRepository.update(articleId, articleData);
  const updatedArticle = await productRepository.findOneBy({ id: articleId });
  return updatedArticle!;
}

/**
 * @description Delete an article
 * @param {number} articleId The ID of the article to be deleted
 * @returns {Promise<void>}
 */
export async function deleteArticle(articleId: number): Promise<void> {
  const productRepository = SQLDataSource.getRepository(Product);
  await productRepository.delete(articleId);
}
