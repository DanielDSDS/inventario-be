import SQLDataSource from "..";
import { Product } from "../entities/Product";
import { Company } from "../entities/Company";

/**
 * @description Create a new product
 * @param {number} companyId The ID of the company
 * @param {Partial<Product>} productData The product data to be created
 * @returns {Promise<Product>} The created product
 */
export async function createproduct(companyId: number, productData: Partial<Product>): Promise<Product> {
  const productRepository = SQLDataSource.getRepository(Product);
  const company = await SQLDataSource.getRepository(Company).findOneBy({ id: companyId });
  if (!company) {
    throw new Error("Company not found");
  }
  const product = productRepository.create({ ...productData, company });
  console.log(product)
  await productRepository.save(product);
  return product;
}

/**
 * @description Get products by company ID
 * @param {number} companyId The ID of the company
 * @returns {Promise<Product[]>} Array of products
 */
export async function getproductsByCompanyId(companyId: number): Promise<Product[]> {
  const productRepository = SQLDataSource.getRepository(Product);
  const company = await SQLDataSource.getRepository(Company).findOneBy({ id: companyId });
  if (!company) {
    throw new Error("Company not found");
  }
  const products = await productRepository.findBy({ company });
  return products;
}

/**
 * @description Update an product
 * @param {number} productId The ID of the product to be updated
 * @param {Partial<Product>} productData The new data for the product
 * @returns {Promise<Product>} The updated product
 */
export async function updateproduct(productId: number, productData: Partial<Product>): Promise<Product> {
  const productRepository = SQLDataSource.getRepository(Product);
  await productRepository.update(productId, productData);
  const updatedproduct = await productRepository.findOneBy({ id: productId });
  return updatedproduct!;
}

/**
 * @description Delete an product
 * @param {number} productId The ID of the product to be deleted
 * @returns {Promise<void>}
 */
export async function deleteproduct(productId: number): Promise<void> {
  const productRepository = SQLDataSource.getRepository(Product);
  await productRepository.delete(productId);
}
