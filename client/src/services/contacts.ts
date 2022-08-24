import axios from 'axios'

const baseUrl = '/api/contacts'

let token = null as null | string

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

export const getSingleContact = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  } as any
  const request = await axios.get(`${baseUrl}/${id}`, config)
  return request.data
}

export default {
  setToken,
  getSingleContact,
}
