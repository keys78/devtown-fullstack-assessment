import { Auth } from '@/features/auth/authSlice';
import { IToken } from '@/types';
import errorHandler from '@/utils/errorHandler';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService';


const storedToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
const token2 = storedToken ? JSON.parse(storedToken) : '';

interface Board {
  _id: string;
  title: string;

}
interface pairMode {
  enabled: boolean,
  isActive: boolean,
  initials: string,
  id: string,
}
type Boards = Board[];

type User = {
  _id: string,
  username: string,
  email: string,
  role: string,
  boards: Boards,
  reviewedApp: boolean,
  verified: boolean,
  pairmode: pairMode,
  createdAt: string,
  updatedAt: string
};


interface IUserState {
  user: User | null,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  isLoadingPairMode: boolean,
  message: {} | string | null;
}

const initialState: IUserState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingPairMode: false,
  message: '',
}


// Get user
export const getUser = createAsyncThunk<User, void>(
  'user',
  async (_, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
    try {
      return await userService.getUser(token)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


// change Passoword
export const changePassword = createAsyncThunk<{}, any>(
  'change-password',
  async ({ changePasswordData, userId }, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
    try {
      return await userService.changePassword(changePasswordData, userId, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)

// pair invite
export const sendPairInvite = createAsyncThunk<{}, any>(
  'pair-invite',
  async ({ invitePayload }, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
    try {
      return await userService.sendPairInvite(invitePayload, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)


// toggle pairmode
export const togglePairMode = createAsyncThunk<any, any>(
  'toggle-pairmode',
  async ({ router, move }, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
    try {
      return await userService.togglePairMode(router, move, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)

// unpair user
export const unPairUser = createAsyncThunk<any, any>(
  'unpair-user',
  async ({ router, move }, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
    try {
      return await userService.unPairUser(router, move, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)



export const privateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending as any, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || "Something went wrong";
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || "Something went wrong";
      })
      .addCase(sendPairInvite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendPairInvite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(sendPairInvite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || "Something went wrong";
      })
      .addCase(togglePairMode.pending, (state) => {
        state.isLoadingPairMode = true
        state.isSuccess = false
      })
      .addCase(togglePairMode.fulfilled, (state, action) => {
        state.isLoadingPairMode = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(togglePairMode.rejected, (state, action) => {
        state.isLoadingPairMode = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload || "Something went wrong";
      })
      .addCase(unPairUser.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(unPairUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(unPairUser.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload || "Something went wrong";
      })

  },
})

export const { resetUser } = privateSlice.actions
export default privateSlice.reducer

