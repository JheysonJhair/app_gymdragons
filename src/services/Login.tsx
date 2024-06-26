import axios from 'axios';
import { Login } from "../types/User";

export const login = async (loginData: Login) => {
  try {
    console.log(loginData)
    const response = await axios.post('https://zonafitbackend-production.up.railway.app/api/user/login', loginData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};
