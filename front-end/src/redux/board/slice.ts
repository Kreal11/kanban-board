import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addBoardThunk,
  deleteBoardThunk,
  getAllBoardsThunk,
  getBoardByIdThunk,
  updateBoardThunk,
} from "./operations";
import { Board, BoardsState, Card } from "./types";
import {
  addCardThunk,
  deleteCardThunk,
  updateCardThunk,
  updateCardWorkStatusThunk,
} from "../card/operations";

const initialState: BoardsState = {
  boards: [],
  board: {
    _id: "",
    title: "",
    theme: "",
    createdAt: "",
    updatedAt: "",
    cards: [],
  },

  isLoading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBoardsThunk.fulfilled, (state, { payload }) => {
        state.boards = payload;

        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBoardByIdThunk.fulfilled, (state, { payload }) => {
        state.board = payload;

        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        addBoardThunk.fulfilled,
        (state, { payload }: PayloadAction<Board>) => {
          state.boards = [...state.boards, payload];

          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        deleteBoardThunk.fulfilled,
        (state, { payload }: PayloadAction<Board>) => {
          state.boards = state.boards.filter(
            (board) => board._id !== payload._id
          );

          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        updateBoardThunk.fulfilled,
        (state, { payload }: PayloadAction<Board>) => {
          const updatedBoardIndex = state.boards.findIndex(
            (board) => board._id === payload._id
          );

          if (updatedBoardIndex !== -1) {
            state.boards[updatedBoardIndex] = payload;
          }

          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        addCardThunk.fulfilled,
        (state, { payload }: PayloadAction<Card>) => {
          state.board.cards = [...state.board.cards, payload];

          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        deleteCardThunk.fulfilled,
        (state, { payload }: PayloadAction<Card>) => {
          state.board.cards = state.board.cards.filter(
            (card) => card._id !== payload._id
          );

          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        updateCardThunk.fulfilled,
        (state, { payload }: PayloadAction<Card>) => {
          const updatedCardIndex = state.board.cards.findIndex(
            (card) => card._id === payload._id
          );

          if (updatedCardIndex !== -1) {
            state.board.cards[updatedCardIndex] = payload;
          }

          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        updateCardWorkStatusThunk.fulfilled,
        (state, { payload }: PayloadAction<Card>) => {
          const updatedCardWorkStatusIndex = state.board.cards.findIndex(
            (card) => card._id === payload._id
          );

          if (updatedCardWorkStatusIndex !== -1) {
            state.board.cards[updatedCardWorkStatusIndex] = payload;
          }

          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllBoardsThunk.pending,
          getBoardByIdThunk.pending,
          addBoardThunk.pending,
          deleteBoardThunk.pending,
          updateBoardThunk.pending,
          addCardThunk.pending,
          deleteCardThunk.pending,
          updateCardThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllBoardsThunk.rejected,
          getBoardByIdThunk.rejected,
          addBoardThunk.rejected,
          deleteBoardThunk.rejected,
          updateBoardThunk.rejected,
          addCardThunk.rejected,
          deleteCardThunk.rejected,
          updateCardThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = typeof payload === "string" ? payload : null;
        }
      );
  },
});

export const boardsReducer = boardsSlice.reducer;
