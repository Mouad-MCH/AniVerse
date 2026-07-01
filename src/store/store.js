import { configureStore } from "@reduxjs/toolkit"
import animeReducer     from "./animeSlice"
import favoritesReducer from "./favoritesSlice"
import ratingsReducer   from "./ratingsSlice"
import libraryReducer   from "./librarySlice"

export const store = configureStore({
  reducer: {
    anime:     animeReducer,
    favorites: favoritesReducer,
    ratings:   ratingsReducer,
    library:   libraryReducer,
  },
})
