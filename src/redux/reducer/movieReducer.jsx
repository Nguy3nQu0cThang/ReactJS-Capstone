import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";

const initialState = {
  arrMovie: [],
  movieDetails: {},
};

const movieReducer = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {
    setMovieDetails: (state, action) => {
        state.movieDetails = action.payload;
    },
  },
});

export const { setMovieDetails } = movieReducer.actions;

export default movieReducer.reducer;

export const getMovieDetailActionThunk = (id) => {
  return async (dispatch) => {
    console.log(id);
    const response = await http.get(
      `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
    );
    console.log(response.data.content);
    const actionPayload = setMovieDetails(response.data.content);
    console.log(actionPayload);
    dispatch(actionPayload);
  };
};
