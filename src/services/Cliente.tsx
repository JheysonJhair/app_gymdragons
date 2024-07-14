import { Client } from "../types/Client";

const API_URL = "https://zonafitbackend-production.up.railway.app/api/client/";

interface ApiResponseAll {
  msg: string;
  success: boolean;
  data: Client[];
}

interface ApiResponse {
  msg: string;
  success: boolean;
  data: Client;
}

//---------------------------------------------------------------- GET CLIENTS
export async function obtenerClientes(): Promise<Client[]> {
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

//---------------------------------------------------------------- POST CLIENT
export async function crearCliente(
  cliente: Partial<Client>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) {
      throw new Error("Error al crear el cliente");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al crear el cliente: " + error);
  }
}

//---------------------------------------------------------------- UPDATE CLIENT
export async function actualizarCliente(
  clienteId: number,
  cliente: Partial<Client>
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}${clienteId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el cliente");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al actualizar el cliente: " + error);
  }
}

//---------------------------------------------------------------- DELETE CLIENT
export async function eliminarCliente(
  clienteId: number
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}${clienteId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el cliente");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al eliminar el cliente: " + error);
  }
}

//---------------------------------------------------------------- GET BY CODE CLIENT
export const obtenerClientePorCODE = async (
  code: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}getCode/${code}`);
    if (!response.ok) {
      throw new Error("Error al obtener las asistencias.");
    }
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching assistances:", error);
    throw error;
  }
};
