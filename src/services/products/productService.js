import { fetchClient } from '../../utils/fetchClient'

export async function getProducts() {
  try {
    let data = await fetchClient('/api/product/', 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const saveProduct = async (user) => {
  try {
    let data = await fetchClient('/api/product/', 'POST', user)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const updateProduct = async (user) => {
  try {
    let data = await fetchClient('/api/product/', 'PUT', user)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const removeProduct = async (id) => {
  try {
    let data = await fetchClient(`/api/product/${id}`, 'DELETE', null)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const getProduct = async (id) => {
  try {
    let data = await fetchClient(`/api/product/${id}`, 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}

///api/product/mostselled
export const getMostSelledProducts = async () => {
  try {
    let data = await fetchClient(`/api/product/mostselled`, 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}

//less selled
export const getLessSelledProducts = async () => {
  try {
    let data = await fetchClient(`/api/product/lessselled`, 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}

