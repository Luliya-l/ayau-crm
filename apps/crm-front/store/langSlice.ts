import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { Langs } from "../specs/costom-types";
import ru from "../data/localization/ru.json";
import en from "../data/localization/en.json";
import kz from "../data/localization/en.json";

const initialState: Langs = {
  langs: {ru: ru, en: en, kz: kz},
};

export const langSlice = createSlice({
  name: "langs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action['payload']['langs'],
        }
    })
  },
});

export const selectLangState = (state: AppState) => state.langs.langs;

export default langSlice.reducer;