import { IUserLogin, IUserSignUp } from '../../types'
import axios from 'axios'
import { toast } from 'react-toastify'



const signup = async (userData: IUserSignUp) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_API + 'auth/signup'}`, userData)

    toast.success(response?.data?.message as string, { autoClose: false });
    return response
}

const login = async (userData: IUserLogin) => {
    const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_API + 'auth/login'}`, userData)

    if (data?.token) { localStorage.setItem('ntp-token', JSON.stringify(data.token)) }
    return data
}

const verifyEmail = async (id: string, verifyToken: string) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_API + `auth/${id}/verify/${verifyToken}`}`)

    toast.success(response.data.message as string, { autoClose: false });
    return response?.data?.message
}


const logout = () => {
    localStorage.removeItem('ntp-token')
}

const authService = {
    signup,
    login,
    verifyEmail,
    logout,
}
export default authService;



