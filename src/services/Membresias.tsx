import { Membership } from "../types/Membership";

const API_URL =
  "https://zonafitbackend-production.up.railway.app/api/membership";
interface ApiResponseAll {
  msg: string;
  success: boolean;
  data: Membership[];
}

//---------------------------------------------------------------- GET MEMBERSHIPS
export const getMembresias = async (): Promise<Membership[]> => {
  try {
    const response = await fetch(API_URL);
    const data: ApiResponseAll = await response.json();
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
export const addMembresia = async (
  newMembresia: Partial<Membership>
): Promise<{ msg: string; success: boolean }> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMembresia),
    });
    if (!response.ok) {
      throw new Error("API: Error adding membresía");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    console.error("API: Error adding membresía:", error);
    return { msg: "Error adding membresía", success: false };
  }
};

//---------------------------------------------------------------- DELETE MEMBERSHIP
export const deleteMembresia = async (
  membershipId: number
): Promise<{ msg: string; success: boolean }> => {
  try {
    const url = `${API_URL}/${membershipId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("API: Error al eliminar la membresia");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    console.error("API: Error al eliminar la membresia:", error);
    return { msg: "Error al eliminar la membresia", success: false };
  }
};

//---------------------------------------------------------------- UPDATE MEMBERSHIP
export const updateMembresia = async (
  updatedMembresia: Membership
): Promise<{ msg: string; success: boolean }> => {
  try {
    const url = `${API_URL}/update`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMembresia),
    });
    if (!response.ok) {
      throw new Error("API: Error updating membresía");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    console.error("API: Error updating membresía:", error);
    return { msg: "Error updating membresía", success: false };
  }
};
