import { combineReducers } from '@reduxjs/toolkit';
import surveyReducer from '../features/survey/surveySlice';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  survey: surveyReducer,
  auth: authReducer,
});

export default rootReducer;
