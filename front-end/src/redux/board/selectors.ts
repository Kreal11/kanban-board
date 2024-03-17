import { RootState } from "../store";

export const selectGetBoards = (state: RootState) => state.boards.boards;
