import { Membership } from "../types/Membership";

const API_URL = "https://zonafitbackend-production.up.railway.app/api/";

//---------------------------------------------------------------- GET MEMBERSHIP
export const getMembresias = async (): Promise<Membership[]> => {
  try {
    const response = await fetch(`${API_URL}membership`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error("API: Failed to fetch data");
    }
  } catch (error) {
    console.error("API: Error fetching membresías:", error);
    return [];
  }
};

//---------------------------------------------------------------- POST MEMBERSHIP
export const addMembresia = async (newMembresia: Membership): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}membership`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMembresia),
    });
    if (!response.ok) {
      throw new Error("API:Error adding membresía");
    }
  } catch (error) {
    console.error("API: Error adding membresía:", error);
  }
};

//---------------------------------------------------------------- DELETE MEMBERSHIP
export const deleteMembresia = async (membershipId: number): Promise<{ msg: string, success: boolean }> => {
  try {
    const url = `${API_URL}membership/${membershipId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("API: Error al eliminar la membresia");
    }
    return data;
  } catch (error) {
    console.error("API: Error al eliminar la membresia:", error);
    return { msg: "Error al eliminar la membresia", success: false };
  }
};