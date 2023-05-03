import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

export const loadingStateSlice = createSlice({
  name: "loadingState",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action['payload']['loadingState'],
        }
    })
  },
});

export const { 
  setLoading 
} = loadingStateSlice.actions;

export const useLoadingState = (state: AppState) => state.loadingState;

export default loadingStateSlice.reducer;