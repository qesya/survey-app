import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { type SurveyConfig, type SurveyResponse } from "./surveySlice";
import { apiGet, apiPost } from "@/lib/api";

export const fetchSurveyConfig = createAsyncThunk<SurveyConfig>(
  "survey/fetchConfig",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGet<SurveyConfig>(`${import.meta.env.VITE_API_BASE_URL}/survey`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const submitSurveyResponse = createAsyncThunk<void, SurveyResponse>(
  "survey/submitResponse",
  async (responseData, { rejectWithValue }) => {
    try {
      await apiPost(`${import.meta.env.VITE_API_BASE_URL}/survey/responses`, responseData);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
