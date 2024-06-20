export interface Product {
  IdProduct: number;
  Name: string;
  Price: number;
  Stock: number;
  Image: string;
}
export type newProduct = {
  Name: string;
  Description: string;
  Image: string;
  Price: number;
  PurchasePrice: number;
  Type: number;
};

export type ErrorMessages = {
  [key in keyof Product]?: string;
};
