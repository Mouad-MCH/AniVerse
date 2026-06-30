import { configureStore } from "@reduxjs/toolkit";
import animeReducer     from "./animeSlice";

export const store = configureStore({
    reducer: {
        anime: animeReducer,
    }
})