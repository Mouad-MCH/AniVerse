import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getFavorites, addFavorites, removeFavorite } from "../services/localDb.js"


const initialState = {
  items:   [],
  loading: false,
  error:   null,
}

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getFavorites()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (anime, { rejectWithValue }) => {
    try {
      return await addFavorites(anime)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const deleteFavorite = createAsyncThunk(
  "favorites/remove",
  async (id, { rejectWithValue }) => {
    try {
      await removeFavorite(id)
      return id
    }catch(err) {
      return rejectWithValue(err.message)
    }
  } 
)


const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => { state.loading = true, state.error = null })
      .addCase(fetchFavorites.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchFavorites.rejected, (state, action) => { state.loading = false; state.error = action.payload })

      .addCase(addFavorite.fulfilled, (state, action) => { state.items.push(action.payload) })

      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(f => f.id !== action.payload)
      })
  }
})

export default favoritesSlice.reducer;


