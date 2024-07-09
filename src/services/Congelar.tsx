import { FreezingDay } from "../types/Freezing";

const API_URL =
  "https://zonafitbackend-production.up.railway.app/api/freezing-day";

interface ApiResponse {
  msg: string;
  success: boolean;
  data: FreezingDay;
}

//---------------------------------------------------------------- POST FREEZING
export async function crearCongelarDias(
  congelar: Partial<FreezingDay>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(congelar),
    });
    if (!response.ok) {
      throw new Error("Error al crear el congelar");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al crear el congelar: " + error);
  }
}

//---------------------------------------------------------------- UPDATE FREEZING
export async function actualizarCongelarDias(
  congelarId: number,
  congelar: Partial<FreezingDay>
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}/update/${congelarId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(congelar),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el congelar");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al actualizar el congelar: " + error);
  }
}

//---------------------------------------------------------------- DELETE FREEZING
export async function eliminarCongelarDias(
  congelarId: number
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}/delete/${congelarId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el congelar");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al eliminar el congelar: " + error);
  }
}

//---------------------------------------------------------------- GET BY CODE FREEZING
export const obtenerCongelarDiasByCODE = async (
  code: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}getById/${code}`);
    if (!response.ok) {
      throw new Error("Error al obtener el congelamiento.");
    }
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching freezing:", error);
    throw error;
  }
};
