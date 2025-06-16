import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { updateResponse } from '@/features/survey/surveySlice';
import type { Question } from '@/types/survey';

interface UseSurveyFormReturn {
  values: Record<string, string | number>;
  errors: Record<string, string>;
  handleChange: (question: Question, value: string | number) => void;
  validateForm: (questions: Question[]) => boolean;
}

export const useSurveyForm = (): UseSurveyFormReturn => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<Record<string, string | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((question: Question, value: string | number): string | null => {
    const { validation } = question;
    if (!validation) return null;

    if (validation.required && !value) {
      return 'This field is required';
    }

    if (validation.minLength && typeof value === 'string' && value.length < validation.minLength) {
      return `Minimum length is ${validation.minLength} characters`;
    }

    if (validation.maxLength && typeof value === 'string' && value.length > validation.maxLength) {
      return `Maximum length is ${validation.maxLength} characters`;
    }

    if (validation.pattern && typeof value === 'string' && !new RegExp(validation.pattern).test(value)) {
      return 'Invalid format';
    }

    return null;
  }, []);

  const handleChange = useCallback((question: Question, value: string | number) => {
    dispatch(updateResponse({ name: question.name, value }));
    setValues(prev => ({ ...prev, [question.name]: value }));
    const error = validateField(question, value);
    setErrors(prev => ({
      ...prev,
      [question.name]: error || ''
    }));
  }, [dispatch, validateField]);

  const validateForm = useCallback((questions: Question[]): boolean => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    questions.forEach(question => {
      const value = values[question.name];
      const error = validateField(question, value);
      if (error) {
        newErrors[question.name] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  }, [values, validateField]);

  return {
    values,
    errors,
    handleChange,
    validateForm,
  };
}; 