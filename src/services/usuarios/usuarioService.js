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
    const usuarios = await getUsers();
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
      const response = await fetchClient("/api/auth/reset-password/", "POST", { email });
      return response;
  } catch (error) {
      console.log(error);
      return false;
  }
}
export async function resetPassword(values) {
  try {
      const response = await fetchClient("/api/auth/change-password/", "POST", values);
      return response;
  } catch (error) {
      console.log(error);
      return false;
  }
}