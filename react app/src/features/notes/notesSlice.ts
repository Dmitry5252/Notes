import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNotesRequest, updateNoteRequest, deleteNoteRequest } from "./notesApi";
import { RootState } from "../../app/store";
import axios from "axios";

export interface note {
  date?: string;
  _id?: string;
  favorite?: boolean;
  deleted?: boolean;
  body: {
    title: string;
    text: string;
  };
  style: {
    fontFamily: string;
    fontSize: string;
    color: string;
    backgroundColor: string;
    textAlign: string;
  };
}

interface notesState {
  notes: note[];
}

const initialState: notesState = { notes: [] };

export const toggleFavoriteNote = createAsyncThunk("notes/toggleFavoriteNote", async (payload: note) => {
  await updateNoteRequest({ ...payload, favorite: !payload.favorite });
  return payload;
});

export const toggleDeletedNote = createAsyncThunk("notes/toggleDeletedNote", async (payload: note) => {
  await updateNoteRequest({ ...payload, deleted: !payload.deleted });
  return payload;
});

export const permanentlyDeleteNote = createAsyncThunk("notes/permanentlyDeleteNote", async (payload: note) => {
  await deleteNoteRequest(payload);
  return payload;
});

export const getNotes = createAsyncThunk("notes/getNotes", async () => {
  try {
    const { data } = await getNotesRequest();
    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401) {
        localStorage.removeItem("access_token");
      }
    }
    return [];
  }
});

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<note>) => {
      state.notes.push({ ...action.payload });
    },
    updateNote: (state, action: PayloadAction<note>) => {
      const index = state.notes.findIndex((note) => note._id === action.payload._id);
      state.notes[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(toggleFavoriteNote.fulfilled, (state, action) => {
      const index = state.notes.findIndex((note) => note._id === action.payload._id);
      state.notes[index].favorite = !action.payload.favorite;
    });
    builder.addCase(toggleDeletedNote.fulfilled, (state, action) => {
      const index = state.notes.findIndex((note) => note._id === action.payload._id);
      state.notes[index].deleted = !action.payload.deleted;
    });
    builder.addCase(permanentlyDeleteNote.fulfilled, (state, action) => {
      const index = state.notes.findIndex((note) => note._id === action.payload._id);
      state.notes.splice(index, 1);
    });
  },
});

export const { addNote, updateNote } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer;
