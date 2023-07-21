import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IToken } from "../../../types";
import noteService from "./noteService";
import { Auth } from "../../auth/authSlice";
import errorHandler from "../../../utils/errorHandler";
import io from 'socket.io-client';
const socket = io(import.meta.env.VITE_APP_BASE_API, { transports: ['websocket'] });

interface Author {
  _id: string,
  username: string
}


export interface Note {
  createdAt?: string;
  author?: Author;
  _id?: string;
  category: string;
  title: string;
  tags: string[]; 
  isPersonal: boolean;
  note: string;
}


interface NotesState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  notes: Note[];
  note: any
}

const initialState: NotesState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  notes: [],
  note: ''
};

const storedToken = typeof window !== 'undefined' ? localStorage.getItem('ntp-token') : null;
export const token2 = storedToken ? JSON.parse(storedToken) : '';

export const getSharedNotes = createAsyncThunk<Note[], void>(
  'get-notes',
  async (_, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
    try {
      return await noteService.getSharedNotes(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPersonalNotes = createAsyncThunk<Note[], void>(
  'get-personal-notes',
  async (_, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
    try {
      return await noteService.getPersonalNotes(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getNote = createAsyncThunk<Note[], any>(
  'get-note',
  async (noteId, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
    try {
      return await noteService.getNote(noteId, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNote = createAsyncThunk<Note, { noteData: Note }>(
  'create-note',
  async ({ noteData }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      const newNote = await noteService.createNote(noteData, token);
      return newNote;
    } catch (error: any) {
      errorHandler(error, thunkAPI);
      throw error;
    }
  }
);


export const updateNote = createAsyncThunk<any, any>(
  'update-note',
  async ({ noteId, noteData }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await noteService.updateNote(noteId, noteData, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)



export const deleteNote = createAsyncThunk<any, any>(
  'delete-note',
  async ({ noteId }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await noteService.deleteNote(noteId, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)




export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    resetBoard: () => initialState,
     //SORTING NOTES
    sortByNameZA: (state) => {
      const sortedNotes = [...state.notes].sort((a, b) => b.title.localeCompare(a.title));
      state.notes = sortedNotes;
    },
    sortByNameAZ: (state) => {
      const sortedNotes = [...state.notes].sort((a, b) => a.title.localeCompare(b.title));
      state.notes = sortedNotes;
    },
   
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(getSharedNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSharedNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getSharedNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getPersonalNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPersonalNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getPersonalNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.note = action.payload;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNote.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })



      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true
      })

      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        if (Array.isArray(state.notes)) {
          state.notes = state.notes.filter((note: Note) => note._id !== action.payload?._id)
        }
        state.message = action?.payload?.message || 'task deleted'
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string || 'unable to delete task'
      })
  },
});

export const cleanupSocketListener = () => {
  socket.off('noteCreated');
};

export const { resetBoard, sortByNameZA, sortByNameAZ } = noteSlice.actions;
export default noteSlice.reducer;
