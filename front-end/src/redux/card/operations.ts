import { createAsyncThunk } from "@reduxjs/toolkit";
import { kanbanApi } from "../instance";
import {
  addCardBody,
  updateCardBody,
  updateCardOrderBody,
  updateCardWorkStatusBody,
} from "./types";

export const getCardByIdThunk = createAsyncThunk(
  "getCardById",
  async (_id: string | undefined, thunkApi) => {
    try {
      const { data } = await kanbanApi.get(`cards/${_id}`);

      return data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
    }
  }
);

export const addCardThunk = createAsyncThunk(
  "addCard",
  async (body: addCardBody, thunkApi) => {
    try {
      const { data } = await kanbanApi.post("cards", body);

      return data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
    }
  }
);

export const deleteCardThunk = createAsyncThunk(
  "deleteCardById",
  async (id: string, thunkApi) => {
    try {
      const { data } = await kanbanApi.delete("cards", {
        params: {
          id,
        },
      });

      return data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
    }
  }
);

export const updateCardThunk = createAsyncThunk(
  "updateCard",
  async (body: updateCardBody, thunkApi) => {
    try {
      const { data } = await kanbanApi.patch("cards", body);

      return data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
    }
  }
);

export const updateCardWorkStatusThunk = createAsyncThunk(
  "updateCardWorkStatus",
  async (body: updateCardWorkStatusBody, thunkApi) => {
    try {
      const { data } = await kanbanApi.patch("cards/workStatus", body);

      return data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
    }
  }
);

export const updateCardOrderThunk = createAsyncThunk(
  "updateCardOrder",
  async (body: updateCardOrderBody, thunkApi) => {
    try {
      const { data } = await kanbanApi.patch("cards/cardOrder", body);

      return data;
    } catch (error) {
      if (error instanceof Error && typeof error.message === "string") {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(`An unknown error occurred: ${error}`);
    }
  }
);
