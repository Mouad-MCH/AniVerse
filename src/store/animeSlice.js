import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAnimeList } from "../services/jikan";


const initialState = {
    animes:     [],
    totalPages: 1,
    page:       1,     

    inputValue: "",
    query:      "",
    genre:      "",
    type:       "",   

    loading: false,
    error:   null,
}


export const fetchAnimes = createAsyncThunk(
    'anime/fetchAnimes',
    async (_, { getState, rejectWithValue }) => {
        const { query, genre, type, page } = getState().anime

        try {
            return await getAnimeList({ query, genre, type, page })
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)


const AnimeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        setInputValue: (state, action) => { state.inputValue = action.payload },
        setGenre: (state, action) => { state.genre = action.payload; state.page = 1 },
        setType: (state, action) => { state.type = action.payload; state.page = 1 },
        setQuery: (state, action) => { state.query = action.payload; state.page = 1 },
        setPage: (state, action) => { state.page = action.payload },
        clearFilters: (state) => {
            state.inputValue = "";
            state.genre = "";
            state.query = "";
            state.type = "";
            state.page = 1;
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimes.pending, (state) => {
                state.loading = true
                state.error   = null
            })
            .addCase(fetchAnimes.fulfilled, (state, action) => {
                state.loading    = false
                state.animes     = action.payload.data
                state.totalPages = action.payload.totalPages
            })
            .addCase(fetchAnimes.rejected, (state, action) => {
                state.loading = false
                state.error   = action.payload
            })
    },
})

export const { setInputValue, setQuery, setGenre, setType, setPage, clearFilters } = AnimeSlice.actions;
export default AnimeSlice.reducer

