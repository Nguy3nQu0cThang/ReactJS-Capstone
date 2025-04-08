import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import movieReducer from "./reducer/movieReducer"
export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    movieReducer:movieReducer
  },
});


