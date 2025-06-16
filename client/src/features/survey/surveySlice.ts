import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { SurveyState, SurveyResponse } from '@/types/survey';
import { surveyApi } from '@/services/api';

const initialState: SurveyState = {
  config: null,
  responses: {},
  loading: false,
  error: null,
};

export const fetchSurveyConfig = createAsyncThunk(
  'survey/fetchConfig',
  async () => {
    return await surveyApi.getConfig();
  }
);

export const submitSurvey = createAsyncThunk(
  'survey/submit',
  async (responses: SurveyResponse) => {
    await surveyApi.submitResponse(responses);
  }
);

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    updateResponse: (state: SurveyState, action: PayloadAction<{ name: string; value: string | number }>) => {
      const { name, value } = action.payload;
      state.responses[name] = value;
    },
    clearResponses: (state: SurveyState) => {
      state.responses = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyConfig.pending, (state: SurveyState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurveyConfig.fulfilled, (state: SurveyState, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(fetchSurveyConfig.rejected, (state: SurveyState, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch survey config';
      })
      .addCase(submitSurvey.pending, (state: SurveyState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSurvey.fulfilled, (state: SurveyState) => {
        state.loading = false;
        state.responses = {};
      })
      .addCase(submitSurvey.rejected, (state: SurveyState, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to submit survey';
      });
  },
});

export const { updateResponse, clearResponses } = surveySlice.actions;
export default surveySlice.reducer;
