import { TestData } from '../../consts/selectors';
import { CategoryKey, ProductTypeKey } from '../../consts/types';

/**
 * Helper functions for working with products and categories
 */

/**
 * Get all product types for a specific category
 * @param categoryKey - The key of the category (e.g., 'computers', 'electronics')
 * @returns Array of product types for the category
 */
export const getProductTypesByCategory = (categoryKey: CategoryKey): readonly string[] => {
  return TestData.categories[categoryKey].productTypes;
};

/**
 * Get all available categories
 * @returns Array of category names
 */
export const getAllCategories = (): string[] => {
  return Object.values(TestData.categories).map(category => category.name);
};

/**
 * Get category key by name
 * @param categoryName - The name of the category (e.g., 'Computers', 'Electronics')
 * @returns The category key or undefined if not found
 */
export const getCategoryKeyByName = (categoryName: string): CategoryKey | undefined => {
  return Object.entries(TestData.categories).find(
    ([_, category]) => category.name === categoryName
  )?.[0] as CategoryKey;
};

/**
 * Check if a product type belongs to a specific category
 * @param categoryKey - The key of the category
 * @param productType - The product type to check
 * @returns boolean indicating if the product type belongs to the category
 */
export const isProductTypeInCategory = (
  categoryKey: CategoryKey,
  productType: ProductTypeKey
): boolean => {
  return TestData.categories[categoryKey].productTypes.includes(productType);
};

/**
 * Get all product types across all categories
 * @returns Array of all product types
 */
export const getAllProductTypes = (): string[] => {
  return Object.values(TestData.categories).flatMap(category => [...category.productTypes]);
};

/**
 * Get category name by product type
 * @param productType - The product type to search for
 * @returns The category name or undefined if not found
 */
export const getCategoryByProductType = (productType: ProductTypeKey): string | undefined => {
  const category = Object.values(TestData.categories).find(category =>
    category.productTypes.includes(productType)
  );
  return category?.name;
};
