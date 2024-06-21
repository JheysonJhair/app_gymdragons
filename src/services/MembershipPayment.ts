import axios from "axios";
import { PaymentMembreship } from "../types/PaymentMembreship";

export const realizarPagoDeMembresia = async (data: PaymentMembreship) => {
  try {
    const response = await axios.post(
      "https://zonafitbackend-production.up.railway.app/api/payment",
      data
    );
    return response;
  } catch (error) {
    throw new Error(`Error al realizar el pago: ${error}`);
  }
};
