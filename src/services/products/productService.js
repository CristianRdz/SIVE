import { fetchClient, getUserData } from "../../utils/fetchClient";

export async function getProducts() {
  try {
    let data = await fetchClient("/api/product/", "GET", null);
    return data;
  } catch (error) {
    console.error(error);
  }
}
