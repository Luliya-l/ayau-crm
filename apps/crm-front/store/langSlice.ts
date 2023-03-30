import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { Langs } from "../specs/custom-types";
import ru from "../data/localization/ru.json";
import en from "../data/localization/en.json";
import kz from "../data/localization/kz.json";

const initialState: Langs = {
  langs: {ru: ru, en: en, kz: kz},
  currentLang: "ru"
};

export const langSlice = createSlice({
  name: "langs",
  initialState,
  reducers: {
    setCurrentLang(state, action) {
      state.currentLang = action.payload;
    }
  },
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

export const { setCurrentLang } = langSlice.actions;

export const selectLangState = (state: AppState) => state.langs;

export default langSlice.reducer;