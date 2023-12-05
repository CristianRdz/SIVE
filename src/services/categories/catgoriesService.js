import { fetchClient } from '../../utils/fetchClient'

export async function getCategories() {
  try {
    let data = await fetchClient('/api/category/', 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const saveCategory = async (user) => {
  try {
    let data = await fetchClient('/api/category/', 'POST', user)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const updateCategory = async (user) => {
  try {
    let data = await fetchClient('/api/category/', 'PUT', user)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const removeCategory = async (id) => {
  try {
    let data = await fetchClient(`/api/category/${id}`, 'DELETE', null)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const getCategory = async (id) => {
  try {
    let data = await fetchClient(`/api/category/${id}`, 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}
