const API_URL = "https://zonafitbackend-production.up.railway.app/api/client/getClientDue";

//-------------------------------------------------------------------------------GET DATE HOME
export async function fetchPaymentCounts() {
    try {
      const response = await fetch(
        "https://zonafitbackend-production.up.railway.app/api/payment/getCount"
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener los totales");
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener los totales:", error);
      throw new Error("Ocurrió un error al obtener los totales");
    }
  }


  //-------------------------------------------------------------------------------GET CLIENT DUE
  export async function getClientDue() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching client due:", error);
      throw error;
    }
  }
    