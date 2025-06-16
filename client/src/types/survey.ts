export interface ValidationRules {
  required: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface Question {
  type: 'text' | 'multiple_choice' | 'rating' | 'textarea';
  label: string;
  name: string;
  validation: ValidationRules;
  options?: string[];
  scale?: number;
}

export interface SurveyConfig {
  title: string;
  questions: Question[];
}

export interface SurveyResponse {
  [key: string]: string | number | undefined;
}

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
