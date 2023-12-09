import { fetchClient } from '../../utils/fetchClient'

export async function getRoles() {
  try {
    let data = await fetchClient('/api/role/', 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}
export const getRole = async (id) => {
  try {
    let data = await fetchClient(`/api/role/${id}`, 'GET', null)
    return data
  } catch (error) {
    console.error(error)
  }
}
