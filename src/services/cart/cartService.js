import { fetchClient } from '../../utils/fetchClient'

export async function getCarts() {
  try {
    let data = await fetchClient('/api/cart/', 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const saveCart = async (user) => {
  try {
    let data = await fetchClient('/api/cart/', 'POST', user)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const updateCart = async (user) => {
  try {
    let data = await fetchClient('/api/cart/', 'PUT', user)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const removeCart = async (id) => {
  try {
    let data = await fetchClient(`/api/cart/${id}`, 'DELETE', null)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const getCart = async (id) => {
  try {
    let data = await fetchClient(`/api/cart/${id}`, 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getCartByUser = async (id) => {
    try {
      let data = await fetchClient(`/api/cart/user/${id}`, 'GET', null)
      return data
    } catch (error) {
      console.error(error)
    }
  }

