import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getLibrary, addLibrary, updateLibrary, removeFromLibrary } from "../services/localDb"


export const fetchLibrary = createAsyncThunk(
  "library/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getLibrary()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const addToLibrary = createAsyncThunk(
  "library/add",
  async (payload, { rejectWithValue }) => {
    try {
      return await addLibrary(payload)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const updateLibraryEntry = createAsyncThunk(
  "library/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateLibrary(id, data)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const removeFromLibraryEntry = createAsyncThunk(
  "library/remove",
  async (id, { rejectWithValue }) => {
    try {
      await removeFromLibrary(id)
      return id
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)


const librarySlice = createSlice({
  name: "library",
  initialState: {
    items:   [],
    loading: false,
    error:   null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchLibrary.pending,   (state) => { state.loading = true;  state.error = null })
      .addCase(fetchLibrary.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchLibrary.rejected,  (state, action) => { state.loading = false; state.error = action.payload })
      
      .addCase(addToLibrary.fulfilled, (state, action) => { state.items.push(action.payload) })
      
      .addCase(updateLibraryEntry.fulfilled, (state, action) => {
        const idx = state.items.findIndex(l => l.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      
      .addCase(removeFromLibraryEntry.fulfilled, (state, action) => {
        state.items = state.items.filter(l => l.id !== action.payload)
      })
  },
})

export default librarySlice.reducer
