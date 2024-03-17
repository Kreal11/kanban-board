import { createAsyncThunk } from "@reduxjs/toolkit";
import { kanbanApi } from "../instance";

export const getAllBoardsThunk = createAsyncThunk(
  "getAllBoards",
  async (_, thunkApi) => {
    try {
      const { data } = await kanbanApi.get("boards");
      console.log(data);
      return data.data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
    }
  }
);

export const getBoardByIdThunk = createAsyncThunk(
  "getBoardById",
  async (_id, thunkApi) => {
    try {
      const { data } = await kanbanApi.get(`boards/${_id}`);
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

// export const addBoardThunk = createAsyncThunk<
//   IQuizCreate,
//   { theme: string },
//   AsyncThunkConfig
// >("addedNewQuizes", async (quiz, thunkApi) => {
//   try {
//     const { theme } = quiz;

//     const { data } = await quizApi.post("/quiz", { theme });

//     return data.data as IQuizCreate;
//   } catch (error: unknown) {
//     return thunkApi.rejectWithValue(
//       `${(error as Error)?.message ?? "Unknown error"}`
//     );
//   }
// });

// export const deleteBoardThunk = createAsyncThunk<
//   string,
//   string,
//   AsyncThunkConfig
// >("deleteQuizById", async (_id, thunkApi) => {
//   try {
//     await quizApi.delete(`/quiz/${_id}`, {});
//     return _id;
//   } catch (error: unknown) {
//     return thunkApi.rejectWithValue(
//       `${(error as Error)?.message ?? "Unknown error"}`
//     );
//   }
// });

// export const updateBoardThunk = createAsyncThunk<
//   QuizBody,
//   EditQuiz,
//   AsyncThunkConfig
// >("updateQuiz", async (quiz, thunkApi) => {
//   try {
//     const { _id, ...body } = quiz;

//     const { data } = await quizApi.patch(`/quiz/${_id}`, body, {});
//     return data as QuizBody;
//   } catch (error: unknown) {
//     return thunkApi.rejectWithValue(
//       `${(error as Error)?.message ?? "Unknown error"}`
//     );
//   }
// });
