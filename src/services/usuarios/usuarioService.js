import { fetchClient, getUserData } from "../../utils/fetchClient";
// fetchClient(url, method, body)
export const getUsers= async () => {
  try {
    let data = await fetchClient("/api/user/", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const saveUser= async (user) => {
  try {
    let data = await fetchClient("/api/user/", "POST", user);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updateUser= async (user) => {
  try {
    let data = await fetchClient("/api/user/", "PUT", user);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const removeUser= async (id) => {
  try {
    const userInfo = await getUserData();
    if (userInfo.identKey === id) {
      return null;
    }
    const usuarios = await getUsuarios();
    if (usuarios.length === 1) {
      return null;
    }
    let data = await fetchClient(`/api/user/${id}`, "DELETE", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getUser= async (id) => {
  try {
    let data = null;
    const userInfo = await getUserData();
    data = await fetchClient(`/api/user/${id}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const changePasswordUser= async (usuario) => {
  try {
    let data = await fetchClient("/api/user/pass/", "PUT", usuario);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function recoverPassword(email) {
  try {
      const url = `${API_URL}/api/auth/reset-password/`;
      const params = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: email })
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