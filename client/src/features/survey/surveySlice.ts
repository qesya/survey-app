import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { fetchSurveyConfig, submitSurveyResponse } from "./surveyThunks";

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface Question {
  type: "text" | "textarea" | "multiple_choice" | "rating" | "select";
  label: string;
  name: string;
  options?: string[];
  scale?: number;
  validation: ValidationRules;
}

export interface SurveyConfig {
  title: string;
  questions: Question[];
}

export interface SurveyResponse {
  [key: string]: string | number;
}

interface SurveyState {
  config: SurveyConfig | null;
  responses: SurveyResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  submissionStatus: "idle" | "loading" | "succeeded" | "failed";
  error: any | null;
  submissionError: any | null;
}

const initialState: SurveyState = {
  config: null,
  responses: {},
  status: "idle",
  submissionStatus: "idle",
  error: null,
  submissionError: null,
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    updateResponse: (
      state,
      action: PayloadAction<{ name: string; value: string | number }>
    ) => {
      state.responses[action.payload.name] = action.payload.value;
    },
    resetSubmissionStatus: (state) => {
      state.submissionStatus = "idle";
      state.submissionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyConfig.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSurveyConfig.fulfilled,
        (state, action: PayloadAction<SurveyConfig>) => {
          state.status = "succeeded";
          state.config = action.payload;
        }
      )
      .addCase(fetchSurveyConfig.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(submitSurveyResponse.pending, (state) => {
        state.submissionStatus = "loading";
        state.submissionError = null;
      })
      .addCase(submitSurveyResponse.fulfilled, (state) => {
        state.submissionStatus = "succeeded";
        state.responses = {};
      })
      .addCase(submitSurveyResponse.rejected, (state, action) => {
        state.submissionStatus = "failed";
        state.submissionError = action.payload;
      });
  },
});

export const { updateResponse, resetSubmissionStatus } = surveySlice.actions;

export default surveySlice.reducer;
