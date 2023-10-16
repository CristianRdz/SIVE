import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../utils/constants.js";

//http://localhost:8080/api/auth/login/

export async function login(username, password) {
  try {
    const url = `${API_URL}/api/auth/login/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    if (result.data) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
