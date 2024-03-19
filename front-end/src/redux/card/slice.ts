import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
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
    status: "",
  },
  isLoading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCardByIdThunk.fulfilled, (state, { payload }) => {
      state.card = payload;

      state.isLoading = false;
      state.error = null;
    });
    //   .addCase(
    //     addBoardThunk.fulfilled,
    //     (state, { payload }: PayloadAction<Board>) => {
    //       state.boards = [...state.boards, payload];

    //       state.isLoading = false;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     deleteBoardThunk.fulfilled,
    //     (state, { payload }: PayloadAction<Board>) => {
    //       state.boards = state.boards.filter(
    //         (board) => board._id !== payload._id
    //       );

    //       state.isLoading = false;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     updateBoardThunk.fulfilled,
    //     (state, { payload }: PayloadAction<Board>) => {
    //       const updatedBoardIndex = state.boards.findIndex(
    //         (board) => board._id === payload._id
    //       );

    //       if (updatedBoardIndex !== -1) {
    //         state.boards[updatedBoardIndex] = payload;
    //       }

    //       state.isLoading = false;
    //       state.error = null;
    //     }
    //   )
    //   .addMatcher(
    //     isAnyOf(
    //       getAllBoardsThunk.pending,
    //       getBoardByIdThunk.pending,
    //       addBoardThunk.pending,
    //       deleteBoardThunk.pending,
    //       updateBoardThunk.pending
    //     ),
    //     (state) => {
    //       state.isLoading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addMatcher(
    //     isAnyOf(
    //       getAllBoardsThunk.rejected,
    //       getBoardByIdThunk.rejected,
    //       addBoardThunk.rejected,
    //       deleteBoardThunk.rejected,
    //       updateBoardThunk.rejected
    //     ),
    //     (state, { payload }) => {
    //       state.isLoading = false;
    //       state.error = typeof payload === "string" ? payload : null;
    //     }
    //   );
  },
});

export const cardsReducer = cardsSlice.reducer;
