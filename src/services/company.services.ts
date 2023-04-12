import SQLDataSource from "..";
import { Company } from "../entities/Company";

/**
 * @description Create a new company
 * @param {Partial<Company>} companyData The data for the new company
 * @returns {Promise<Company>} The created company
 */
export async function createCompany(companyData: Partial<Company>): Promise<Company> {
  const companyRepository = SQLDataSource.getRepository(Company);
  const company = companyRepository.create(companyData);
  await companyRepository.save(company);
  return company;
}

/**
 * @description Get all companies
 * @returns {Promise<Company[]>} An array of companies
 */
export async function getCompanies(): Promise<Company[]> {
  const companyRepository = SQLDataSource.getRepository(Company);
  const companies = await companyRepository.find();
  return companies;
}

/**
 * @description Get a company by its ID
 * @param {number} id The ID of the company
 * @returns {Promise<Company | undefined>} The company with the specified ID, or undefined if not found
 */
export async function getCompanyById(id: number): Promise<Company | undefined> {
  const companyRepository = SQLDataSource.getRepository(Company);
  const company = await companyRepository.findOneBy({ id });
  return company;
}

/**
 * @description Update a company's data
 * @param {number} id The ID of the company
 * @param {Partial<Company>} companyData The new data for the company
 * @returns {Promise<Company>} The updated company
 */
export async function updateCompany(id: number, companyData: Partial<Company>): Promise<Company> {
  const companyRepository = SQLDataSource.getRepository(Company);
  await companyRepository.update(id, companyData);
  const updatedCompany = await companyRepository.findOneBy({ id });
  return updatedCompany!;
}

/**
 * @description Delete a company
 * @param {number} id The ID of the company
 * @returns {Promise<void>} No return value
 */
export async function deleteCompany(id: number): Promise<void> {
  const companyRepository = SQLDataSource.getRepository(Company);
  await companyRepository.delete(id);
}
