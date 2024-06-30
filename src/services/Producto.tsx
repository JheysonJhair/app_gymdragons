import { Product, newProduct } from "../types/Product";

const API_URL = "https://zonafitbackend-production.up.railway.app/api/product";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.data;
};

export const addProduct = async (
  newProduct: newProduct
): Promise<{ msg: string; success: boolean }> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  const responseData = await response.json();
  return {
    msg: responseData.msg,
    success: responseData.success,
  };
};
export const fetchProductById = async (productId: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/${productId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data.data;
};

export const updateProduct = async (
  productId: any,
  updatedProduct: Partial<Product>
): Promise<Product> => {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  const data = await response.json();
  return data.data;
};