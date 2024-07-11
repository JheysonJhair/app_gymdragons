export interface Product {
  IdProduct: number;
  Name: string;
  Price: number;
  Stock: number;
  Description?: string;
  Type?: number;
  PurchasePrice?: number;
  file: File;
  Image?: string
}
export type newProduct = {
  Name: string;
  Description: string;
  file: File;
  Price: number;
  PurchasePrice: number;
  Type: number;
  Stock:number;
  Image?: string
};

export type ErrorMessages = {
  [key in keyof Product]?: string;
};
