import { Product, newProduct } from "../types/Product";

const API_URL2 = "https://zonafitbackend-production.up.railway.app/api/payment/insertCart";
const API_URL = "https://zonafitbackend-production.up.railway.app/api/product";

interface ApiResponseAll {
  msg: string;
  success: boolean;
  data: Product[];
}

interface ApiResponse {
  msg: string;
  success: boolean;
  data: Product;
}

//---------------------------------------------------------------- GET PRODUCTS

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const responseData: ApiResponseAll = await response.json();
    if (!responseData.success) {
      throw new Error(responseData.msg);
    }
    return responseData.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

//---------------------------------------------------------------- POST PRODUCT

export async function addProduct(
  newProduct: Partial<newProduct>
): Promise<{ msg: string; success: boolean }> {
  try {
    const formData = new FormData();
    formData.append('Name', newProduct.Name || '');
    formData.append('Description', newProduct.Description || '');
    if (newProduct.file) {
      formData.append('file', newProduct.file);
    }
    formData.append('Price', newProduct.Price?.toString() || '');
    formData.append('PurchasePrice', newProduct.PurchasePrice?.toString() || '');
    formData.append('Type', newProduct.Type?.toString() || '');
    formData.append('Stock', newProduct.Stock?.toString() || '');

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }

    const responseData: { msg: string; success: boolean } = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('Error al crear el producto: ');
  }
}

//---------------------------------------------------------------- UPDATE PRODUCT
export async function updateProduct(
  productId: number,
  updatedProduct: Partial<Product>
): Promise<{ msg: string; success: boolean; data: Product }> {
  try {
    const url = `${API_URL}/${productId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }
    const responseData: { msg: string; success: boolean; data: Product } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al actualizar el producto: " );
  }
}


//---------------------------------------------------------------- GET BY ID PRODUCT
export async function fetchProductById(
  productId: any
): Promise<Product | null> {
  try {
    const url = `${API_URL}/${productId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los datos del producto por ID");
    }
    const responseData: ApiResponse = await response.json();
    if (!responseData.success || !responseData.data) {
      throw new Error(
        responseData.msg || "Error al obtener los datos del producto"
      );
    }
    return responseData.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
//---------------------------------------------------------------- DELETE PRODUCT
export async function deleteProduct(productId: string): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}/${productId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }
    const responseData: { msg: string; success: boolean } = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`Error al eliminar el producto`);
  }
}


//---------------------------------------------------------------- CART PRODUCT

export async function realizarVenta(totalPrice: number, cartItems: Product[]): Promise<{ msg: string; success: boolean }> {
  const productsData = new Map<number, number>(); 

  cartItems.forEach(item => {
    const productId = item.IdProduct;
    const currentCount = productsData.get(productId) || 0;
    productsData.set(productId, currentCount + 1); 
  });

  const productsIds = Array.from(productsData.keys());
  const stocks = Array.from(productsData.values());

  const data = {
    Price: totalPrice,
    Products: productsIds,
    Stocks: stocks
  };

  console.log(data);

  try {
    const response = await fetch(API_URL2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al realizar la venta");
    }

    const responseData: { msg: string; success: boolean } = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al realizar la venta: " );
  }
}
