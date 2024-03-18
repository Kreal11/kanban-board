import { createSlice } from "@reduxjs/toolkit";
import { getAllBoardsThunk, getBoardByIdThunk } from "./operations";
import { BoardsState } from "./types";

const initialState: BoardsState = {
  boards: [],
  board: {
    _id: "",
    title: "",
    theme: "",
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
      });
    //   .addCase(fetchQuizesByRatingThunk.fulfilled, (state, { payload }) => {
    //     state.listRaiting = payload;
    //     state.isLoading = false;
    //   })
    //   .addCase(fetchCategoriesThunk.fulfilled, (state, { payload }) => {
    //     state.listCategory.data = payload.data;
    //     state.listCategory.data.category = payload.data.category;
    //     state.listCategory.currentPage = payload.currentPage;
    //     state.listCategory.pageSize = payload.pageSize;
    //     state.listCategory.totalPages = payload.totalPages;
    //     state.listCategory.data.total = payload.data.total;

    //     state.isLoading = false;
    //   })
    //   .addCase(deleteQuizesThunk.fulfilled, (state, { payload }) => {
    //     state.listCategory.data.result = state.listCategory.data.result.filter(
    //       (quiz) => quiz._id !== payload
    //     );
    //     state.isLoading = false;
    //   })
    //   .addCase(updateQuizesThunk.fulfilled, (state, { payload }) => {
    //     const updatedQuizeIndex = state.listCategory.data.result.findIndex(
    //       (quiz) => quiz._id === payload._id
    //     );
    //     if (updatedQuizeIndex) {
    //       state.listCategory.data.result[updatedQuizeIndex] = {
    //         ...state.listCategory.data.result[updatedQuizeIndex],
    //         ...payload,
    //       };
    //     }
    //     state.isLoading = false;
    //   })
    //   .addCase(getFavoriteQuizes.fulfilled, (state, { payload }) => {
    //     state.listCategory.data.result = payload;
    //     state.isLoading = false;
    //   })
    //   .addCase(getOwnQuizes.fulfilled, (state, { payload }) => {
    //     state.listCategory.data.result = payload;
    //     state.isLoading = false;
    //   })
    //   .addCase(getPassedQuizzesThunk.fulfilled, (state, { payload }) => {
    //     state.listCategory.data.result = payload;
    //     state.isLoading = false;
    //   })
    //   .addCase(getTotalQuizzesThunk.fulfilled, (state, { payload }) => {
    //     state.totalPassedQuizzes = payload;
    //     state.isLoading = false;
    //   })
    //   .addMatcher(
    //     isAnyOf(
    //       fetchQuizesThunk.pending,
    //       fetchCategoriesThunk.pending,
    //       getFavoriteQuizes.pending,
    //       getOwnQuizes.pending,
    //       getPassedQuizzesThunk.pending
    //     ),
    //     (state) => {
    //       state.isLoading = true;
    //       state.listCategory.data.result = [];
    //     }
    //   )
    //   .addMatcher(
    //     isAnyOf(
    //       addQuizesThunk.pending,
    //       deleteQuizesThunk.pending,
    //       updateQuizesThunk.pending
    //     ),
    //     (state) => {
    //       state.isLoading = true;
    //     }
    //   )
    //   .addMatcher(
    //     isAnyOf(
    //       fetchQuizesThunk.rejected,
    //       addQuizesThunk.rejected,
    //       deleteQuizesThunk.rejected,
    //       updateQuizesThunk.rejected,
    //       fetchCategoriesThunk.rejected,
    //       getFavoriteQuizes.rejected,
    //       getOwnQuizes.rejected,
    //       getPassedQuizzesThunk.rejected
    //     ),
    //     (state, action) => {
    //       state.isLoading = false;
    //       state.error =
    //         typeof action.payload === "string" ? action.payload : null;
    //     }
    //   );
  },
});

export const boardsReducer = boardsSlice.reducer;
