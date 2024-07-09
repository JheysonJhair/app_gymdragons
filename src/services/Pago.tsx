import { Payment } from "../types/Payment";

const API_URL = "https://zonafitbackend-production.up.railway.app/api/payment";


interface ApiResponse {
  msg: string;
  success: boolean;
  data: Payment;
}

//---------------------------------------------------------------- POST PAYMENT
export async function realizarPago(pago: Payment): Promise<ApiResponse> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pago),
    });
    if (!response.ok) {
      throw new Error("Error al realizar el pago");
    }
    const responseData: ApiResponse = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al realizar el pago: " + error);
  }
}
