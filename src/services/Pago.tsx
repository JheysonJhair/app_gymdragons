import { Payment } from "../types/Payment";

const API_URL = "https://zonafitbackend-production.up.railway.app/api/payment";
const API_URL2 = 'https://zonafitbackend-production.up.railway.app/api/attendance/';
interface ApiResponse {
  msg: string;
  success: boolean;
  data: Payment;
}
interface ApiResponseGet {
  msg: string;
  success: boolean;
  data: any[];
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

//---------------------------------------------------------------- GET PAYMENT CODE
export const getPagoCompletoCode = async (
  code: string
): Promise<ApiResponseGet> => {
  try {
    const response = await fetch(`${API_URL2}allByCode/${code}`);

    if (!response.ok) {
      throw new Error("Error al obtener las asistencias.");
    }

    const data: ApiResponseGet = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching assistances:", error);
    throw error;
  }
};
