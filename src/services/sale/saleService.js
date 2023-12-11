import { fetchClient } from "../../utils/fetchClient";

export async function getSales() {
  try {
    let data = await fetchClient("/api/sale/", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
}
export const saveSale = async (user) => {
  try {
    let data = await fetchClient("/api/sale/", "POST", user);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updateSale = async (user) => {
  try {
    let data = await fetchClient("/api/sale/", "PUT", user);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const removeSale = async (id) => {
  try {
    let data = await fetchClient(`/api/sale/${id}`, "DELETE", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getSale = async (id) => {
  try {
    let data = await fetchClient(`/api/sale/${id}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const cartToSale = async (id) => {
  try {
    let data = await fetchClient(`/api/sale/cart/${id}`, "POST", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const confirmSale = async (id) => {
  try {
    const sale = await getSale(id);
    sale.purchase_status = "Confirmada";
    let data = await fetchClient(`/api/sale/${id}`, "PUT", sale);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSalesByUser = async () => {
  try {
    const userInfo = await getUserData();
    let data = await fetchClient(
      `/api/sale/user/${userInfo.identKey}`,
      "GET",
      null
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSalesByDate = async (date) => {
  try {
    let data = await fetchClient(`/api/sale/date/${date}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
