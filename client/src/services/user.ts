import axios from 'axios'
const baseUrl = '/api/auth/register'

export const createUser = async (newUser: {
  email: string
  password: string
}) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data.msg
}
