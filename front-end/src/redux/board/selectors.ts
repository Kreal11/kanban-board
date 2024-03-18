import { RootState } from "../store";

export const selectGetBoards = (state: RootState) => state.boards.boards;
export const selectGetBoardById = (state: RootState) => state.boards.board;
