import { newProduct } from "../types/Product";

const API_URL = "https://zonafitbackend-production.up.railway.app/api/product";

export const fetchProducts = async (): Promise<newProduct[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.data;
};

export const addProduct = async (newProduct: newProduct): Promise<{ msg: string, success: boolean }> => {
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
    success: responseData.success
  };
};
