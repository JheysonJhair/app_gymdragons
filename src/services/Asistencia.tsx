const API_URL = 'https://zonafitbackend-production.up.railway.app/api/attendance/';

interface ApiResponse {
  msg: string;
  success: boolean;
  data: any[];
}

//---------------------------------------------------------------- GET ASSISTS CODE
export const fetchAssistancesByCode = async (code: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}allByCode/${code}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener las asistencias.');
    }
    
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching assistances:', error);
    throw error;
  }
};
