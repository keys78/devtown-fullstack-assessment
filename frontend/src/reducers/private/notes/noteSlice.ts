// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createAsyncThunk, createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
// import { IToken } from "../../../types";
// import noteService from "./noteService";
// import { Auth } from "../../auth/authSlice";
// import errorHandler from "../../../utils/errorHandler";
// import io from 'socket.io-client';
// const socket = io('http://localhost:4000', { transports: ['websocket'] });

// export interface Note {
//   title: string;
//   note: string;
//   status: string;
//   createdBy: string;
// }

// interface NotesState {
//   isLoading: boolean;
//   isSuccess: boolean;
//   isError: boolean;
//   message: string;
//   notes: Note[]; // Your initial notes array structure here
// }

// // Define your initial state object here.
// const initialState: NotesState = {
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: "",
//   notes: [], // Your initial notes array structure here
// };

// const storedToken = typeof window !== 'undefined' ? localStorage.getItem('ntapp-token') : null;
// export const token2 = storedToken ? JSON.parse(storedToken) : '';

// // Get user
// export const getSharedNotes = createAsyncThunk<Note[], void>(
//   'get-notes',
//   async (_, thunkAPI) => {
//     const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;
//     try {
//       return await noteService.getSharedNotes(token);
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// interface NewNotePayload {
//   newNote: Note;
// }

// export const createNote = createAsyncThunk<Note, { noteData: Note }>(
//   'create-note',
//   async ({ noteData }, thunkAPI) => {
//     const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
//     try {
//       const newNote = await noteService.createNote(noteData, token);

//       // socket.emit('noteCreated',  newNote );

//       // thunkAPI.dispatch(noteCreated( newNote ));


//       return newNote;
//     } catch (error: any) {
//       errorHandler(error, thunkAPI);
//       throw error;
//     }
//   }
// );



// // Create an action for the noteCreated event
// export const noteCreated = socket.on('noteCreated', (newNote: Note) => {
//   return newNote
// });
// // export const noteCreated = createAction<NewNotePayload>('noteCreated');

// export const noteSlice = createSlice({
//   name: 'note',
//   initialState,
//   reducers: {
//     resetBoard: (state) => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getSharedNotes.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getSharedNotes.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.notes = action.payload;
//       })
//       .addCase(getSharedNotes.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload as string;
//       })
//       .addCase(createNote.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createNote.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.notes.push(action.payload); // Add the newly created note to the state
//       })
   
//       .addCase(createNote.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload as string;
//       });
//   },
// });

// // Cleanup function to remove the socket event listener when the component unmounts
// export const cleanupSocketListener = () => {
//   socket.off('noteCreated');
// };

// export const { resetBoard } = noteSlice.actions;
// export default noteSlice.reducer;






import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IToken } from "../../../types";
import noteService from "./noteService";
import { Auth } from "../../auth/authSlice";
import errorHandler from "../../../utils/errorHandler";
import io from 'socket.io-client';
const socket = io('http://localhost:4000', { transports: ['websocket'] });

interface Author {
  _id: string,
  username: string
}


export interface Note {
  author?: Author;
  _id?: any;
  category: string,
  title: string,
  tags: [],
  isPersonal: boolean,
  note: string, 
}

interface NotesState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  notes: Note[];
  note:any
}

const initialState: NotesState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  notes: [],
  note:''
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

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    resetBoard: (state) => initialState,
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
      });
  },
});

export const cleanupSocketListener = () => {
  socket.off('noteCreated');
};

export const { resetBoard } = noteSlice.actions;
export default noteSlice.reducer;
