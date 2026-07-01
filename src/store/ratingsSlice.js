import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getRating, addRating, updateRating, removeRating } from "../services/localDb"


export const fetchRatings = createAsyncThunk(
  "ratings/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getRating()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const createRating = createAsyncThunk(
  "ratings/add",
  async (payload, { rejectWithValue }) => {
    try {
      return await addRating(payload)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const editRating = createAsyncThunk(
  "ratings/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateRating(id, data)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const deleteRating = createAsyncThunk(
  "ratings/remove",
  async (id, { rejectWithValue }) => {
    try {
      await removeRating(id)
      return id
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)


const ratingsSlice = createSlice({
  name: "ratings",
  initialState: {
    items:   [],
    loading: false,
    error:   null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchRatings.pending,   (state) => { state.loading = true;  state.error = null })
      .addCase(fetchRatings.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchRatings.rejected,  (state, action) => { state.loading = false; state.error = action.payload })
      
      .addCase(createRating.fulfilled, (state, action) => { state.items.push(action.payload) })
      
      .addCase(editRating.fulfilled, (state, action) => {
        const idx = state.items.findIndex(r => r.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.items = state.items.filter(r => r.id !== action.payload)
      })
  },
})

export default ratingsSlice.reducer
