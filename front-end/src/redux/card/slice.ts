import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCardByIdThunk } from "./operations";
import { CardState } from "./types";

const initialState: CardState = {
  card: {
    _id: "",
    title: "",
    description: "",
    owner: "",
    createdAt: "",
    updatedAt: "",
    workStatus: "",
  },
  isLoading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCardByIdThunk.fulfilled, (state, { payload }) => {
        state.card = payload;

        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(getCardByIdThunk.pending), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(getCardByIdThunk.rejected), (state, { payload }) => {
        state.isLoading = false;
        state.error = typeof payload === "string" ? payload : null;
      });
  },
});

export const cardsReducer = cardsSlice.reducer;
