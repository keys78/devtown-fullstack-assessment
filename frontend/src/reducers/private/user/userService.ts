import { IToken, IUserForgotPassword } from '@/types'
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
  const { data } = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + 'private/user', config)
  return data
}

const changePassword = async (changePasswordData: IUserForgotPassword, userId: any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL + `private/changepassword/${userId}`, changePasswordData, config)

  toast.success(response.data.message as string, { autoClose: 1000 });
  return response
}


const sendPairInvite = async (invitePayload: IUserForgotPassword, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL + `private/pair-invite`, invitePayload, config)

  toast.success(response.data.message as string, { autoClose: 6000 });
  return response
}

const togglePairMode = async (router:any, move:boolean, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put( process.env.NEXT_PUBLIC_BASE_API_URL + `private/toggle-pairmode`, {}, config );

  if (response.status === 200 && move === true) {
    router.replace('/user/dashboard');
  }
  return response;
};

const unPairUser = async (router:any, move:boolean, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put( process.env.NEXT_PUBLIC_BASE_API_URL + `private/unpair-user`, {}, config );

  if (response.status === 200 && move === true) {
    router.replace('/user/dashboard');
  }
  return response;
};




const userService = {
  getUser,
  changePassword,
  sendPairInvite,
  togglePairMode,
  unPairUser
}

export default userService