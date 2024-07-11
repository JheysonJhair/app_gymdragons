import { Payment } from "../types/Payment";

const API_URL = "https://zonafitbackend-production.up.railway.app/api/payment";
const API_URL2 = 'https://zonafitbackend-production.up.railway.app/api/client/';
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
interface ApiResponseClient {
  msg: string;
  success: boolean;
  data: {
    IdClient: number;
    Code: number;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Document: string;
    DocumentType: string;
    MaritalStatus: string;
    Gender: string;
    Address: string;
    Whatsapp: string;
    Mail: string;
    BirthDate: string;
    Note: string;
    Image: string;
    Created: string;
    Payment: Payment[];
    Attendance: {
      IdAttendance: number;
      AttendanceDate: string;
    }[];
  };
}

export const getPagoCompletoCode = async (code: string): Promise<ApiResponseClient> => {
  try {
    const response = await fetch(`${API_URL2}getCode/${code}`);
    if (!response.ok) {
      throw new Error("Error al obtener el cliente.");
    }
    const data: ApiResponseClient = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw error;
  }
};


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

