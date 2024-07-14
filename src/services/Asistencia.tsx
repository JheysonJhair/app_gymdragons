const API_URL =
  "https://zonafitbackend-production.up.railway.app/api/attendance/";

interface ApiResponse {
  msg: string;
  success: boolean;
  data: any[];
  dataClient: any;
}

//---------------------------------------------------------------- GET ASSISTS CODE
export const fetchAssistancesByCode = async (
  code: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}allByCode/${code}`);

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

//---------------------------------------------------------------- POST ASSISTS
export async function crearAsistencia(
  identificador: string,
  idUser: number
): Promise<{ msg: string; success: boolean }> {
  const data = {
    Identificador: identificador,
    idUser: idUser,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al crear la asistencia");
    }

    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al crear la asistencia: ");
  }
}
