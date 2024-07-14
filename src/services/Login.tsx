import axios from "axios";
import { Login } from "../types/User";

export const login = async (loginData: Login) => {
  try {
    const response = await axios.post(
      "https://zonafitbackend-production.up.railway.app/api/user/login",
      loginData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};
