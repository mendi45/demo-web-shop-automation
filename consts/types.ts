export interface ProductType {
  name: string;
  productTypes: readonly ProductTypeKey[];
}

export interface CategoryData {
  [key: string]: ProductType;
}

export type CategoryKey = 'books' | 'computers' | 'electronics' | 'apparel' | 'digitalDownloads' | 'jewelry' | 'giftCards';

export type ProductTypeKey = 
  | 'Computing and Internet' | 'Fiction' | 'Health' | 'Science' | 'Sports'
  | 'Desktop' | 'Notebook' | 'Accessories'
  | 'Camera, photo' | 'Cell phones'
  | 'Clothing' | 'Shoes'
  | 'Music' | 'Software' | 'E-books'
  | 'Necklaces' | 'Bracelets' | 'Earrings' | 'Rings'
  | 'Physical Gift Card' | 'Virtual Gift Card'; 