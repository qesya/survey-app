export type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export type Question = {
  type: 'text' | 'multiple_choice' | 'rating';
  label: string;
  name: string;
  options?: string[];
  scale?: number;
  validation?: ValidationRules;
};

export type SurveyConfig = {
  title: string;
  questions: Question[];
};

export type SurveyResponse = {
  [key: string]: string | number;
};

export type SurveyState = {
  config: SurveyConfig | null;
  responses: SurveyResponse;
  loading: boolean;
  error: string | null;
};

export interface ValidationErrors {
    [key: string]: string;
}

interface QuestionValidation {
    required: boolean;
    minLength?: number;
    maxLength?: number;
}

export interface QuestionWithValidation extends Question {
    validation: QuestionValidation;
    label: string;
    name: string;
}

interface SurveyAnswer {
  name: string;
  feedback?: string;
  rating?: number;
}

export interface StoredResponse {
  id: number;
  answers: SurveyAnswer;
  created_at: string;
}

export interface Sentiment {
  score: number;
  category: "Positive" | "Negative" | "Neutral";
  positiveWords: string[];
  negativeWords: string[];
}
