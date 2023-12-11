import { fetchClient, getUserData } from "../../utils/fetchClient";
import { getUser } from "../usuarios/usuarioService";

export async function getCarts() {
  try {
    let data = await fetchClient("/api/cart/", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const saveCart = async () => {
  try {
    const userInfo = await getUserData();
    const user = await getUser(userInfo.identKey);
    let cart = {
      user: user,
    };
    let data = await fetchClient("/api/cart/", "POST", cart);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updateCart = async (cart) => {
  try {
    let data = await fetchClient("/api/cart/", "PUT", cart);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const removeCart = async (id) => {
  try {
    let data = await fetchClient(`/api/cart/${id}`, "DELETE", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getCart = async (id) => {
  try {
    let data = await fetchClient(`/api/cart/${id}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getCartByUser = async () => {
  try {
    const userInfo = await getUserData();
    let data = await fetchClient(
      `/api/cart/user/${userInfo.identKey}`,
      "GET",
      null
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductsByUserCart = async () => {
  try {
    const cart = await getCartByUser();
    const uid_cart = cart.uid_cart;
    let data = await fetchClient(`/api/productsCart/uid_cart/${uid_cart}`, "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addProductToCart = async (productCart) => {
  try {
    const cart = await getCartByUser();
    productCart.cart = cart;
    let data = await fetchClient(
      `/api/productsCart/`,
      "POST",
      productCart
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const removeProductFromCart = async (id) => {
  try {
    let data = await fetchClient(`/api/productsCart/${id}`, "DELETE", null);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const updateProductFromCart = async (productCart) => {
  try {
    let data = await fetchClient(`/api/productsCart/`, "PUT", productCart);
    return data;
  } catch (error) {
    console.error(error);
  }
}

