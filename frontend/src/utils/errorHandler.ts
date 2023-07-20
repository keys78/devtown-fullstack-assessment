import { toast } from 'react-toastify'

const errorHandler = (error: { response: { data: {
  message: any; error: any; 
}; }; message: any; toString: () => any; }, thunkAPI: { rejectWithValue: (arg0: any) => any; }) => {
  const message =
    (error.response &&
      error.response.data &&
      error.response.data.error) ||
      error.response.data.message ||
    error.message ||
    error.toString()
  toast.error(message, { autoClose: 2000 });
  return thunkAPI.rejectWithValue(message)
}

export default errorHandler;