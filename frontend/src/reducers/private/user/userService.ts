import { IToken } from '../../../types'
import axios from 'axios'
import { toast } from 'react-toastify'


// Get user
const getUser = async (token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + 'user', config)
  return data
}


const userService = {
  getUser,
}

export default userService