import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../utils/constants.js";


export async function getUserData() {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    const user = JSON.parse(userInfo);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getUserById(id) {
  try {
    const userInfo = await getUserData();
    const token = userInfo.token;
    const url = `${API_URL}/api/user/${id}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    if (result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateUser(user) {
  try {
    const userInfo = await getUserData();
    const token = userInfo.token;
    const url = `${API_URL}/api/user/`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    if (result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function register(user) {
  try {
    const url = `${API_URL}/api/user/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    if (result.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function recoverPassword(email) {
  try {
      const url = `${API_URL}/api/auth/reset-password/`;
      const params = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ correo: email })
      };

      const response = await fetch(url, params);
      if (response.status === 200) {
          return true;
      }
  } catch (error) {
      console.log(error);
      return false;
  }
}
