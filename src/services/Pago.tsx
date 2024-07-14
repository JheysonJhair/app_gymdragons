import { Payment } from "../types/Payment";
import { User } from "../types/User";

const API_URL = "https://zonafitbackend-production.up.railway.app/api/payment";
const API_URL3 =
  "https://zonafitbackend-production.up.railway.app/api/payment/repairPayment";
interface ApiResponse {
  msg: string;
  success: boolean;
  data: Payment;
}


interface Membership {
  IdMembership: number;
  Name: string;
  Price: number;
  Time: number;
  Enabled: boolean;
}

interface Payment2 {
  PaymentId: number;
  StartDate: string;
  EndDate: string;
  Total: number;
  Discount: number;
  PriceDiscount: number;
  QuantityDays: number;
  DatePayment: string;
  Due: number;
  PrePaid: number;
  PaymentType: string;
  PaymentReceipt: string;
  Observation: string;
  DateRegister: string;
  User: User;
  Membership: Membership;
  FreezingDay: string | null;
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
    BirthDate: string | null;
    Note: string;
    Image: string;
    Created: string;
    Payment: Payment2[];
  };
}

interface ApiResponse {
  msg: string;
  success: boolean;
}

export const getPagoCompletoCode = async (
  code: string
): Promise<ApiResponseClient> => {
  try {
    const response = await fetch(`${API_URL}/client/${code}`);
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

//---------------------------------------------------------------- POST REPAIR PAYMENT
export async function repairPago(pago: any): Promise<ApiResponse> {
  try {
    const response = await fetch(API_URL3, {
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
