import { createAsyncThunk } from "@reduxjs/toolkit";
import { kanbanApi } from "../instance";
// import { AddBoardBody, UpdateBoardBody } from "./types";

export const getCardByIdThunk = createAsyncThunk(
  "getCardById",
  async (_id: string, thunkApi) => {
    try {
      const { data } = await kanbanApi.get(`cards/${_id}`);
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
    }
  }
);

// export const addBoardThunk = createAsyncThunk(
//   "addBoard",
//   async (body: AddBoardBody, thunkApi) => {
//     try {
//       const { data } = await kanbanApi.post("boards", body);
//       console.log(data);
//       return data;
//     } catch (error) {
//       if (error instanceof Error && typeof error.message === "string") {
//         return thunkApi.rejectWithValue(error.message);
//       }
//       return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
//     }
//   }
// );

// export const deleteBoardThunk = createAsyncThunk(
//   "deleteBoardById",
//   async (_id: string, thunkApi) => {
//     try {
//       const { data } = await kanbanApi.delete(`/boards/${_id}`);
//       console.log(data);
//       return data;
//     } catch (error) {
//       if (error instanceof Error && typeof error.message === "string") {
//         return thunkApi.rejectWithValue(error.message);
//       }
//       return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
//     }
//   }
// );

// export const updateBoardThunk = createAsyncThunk(
//   "updateBoard",
//   async (body: UpdateBoardBody, thunkApi) => {
//     try {
//       const { data } = await kanbanApi.patch("boards", body);

//       return data;
//     } catch (error: unknown) {
//       return thunkApi.rejectWithValue(
//         `${(error as Error)?.message ?? "Unknown error"}`
//       );
//     }
//   }
// );
