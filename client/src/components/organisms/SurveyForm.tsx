import React, { useCallback, useState } from "react";

import { type Question, updateResponse } from "@/features/survey/surveySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { submitSurveyResponse } from "@/features/survey/surveyThunks";
import TextField from "@/components/molecules/TextField";
import MultipleChoiceField from "@/components/molecules/MultipleChoiceField";
import RatingField from "@/components/molecules/RatingField";
import { Button } from "@/components/atoms/Button";
import SelectField from "@/components/molecules/SelectField";
import type { QuestionWithValidation, ValidationErrors } from "@/types/survey";

const SurveyForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { config, responses, submissionStatus, submissionError } =
    useAppSelector((state) => state.survey);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = useCallback((name: string, value: string | number) => {
    dispatch(updateResponse({ name, value }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  }, [dispatch, errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    if (!config) return false;

    config.questions.forEach((q) => {
      const question = q as QuestionWithValidation;
      const value: string | number | undefined = responses[question.name];
      const { validation } = question;

      if (
        validation.required &&
        (value === undefined || value === "" || value === null)
      ) {
        newErrors[question.name] = `${question.label} is required.`;
        return;
      }

      if (typeof value === "string") {
        if (validation.minLength && value.length < validation.minLength) {
          newErrors[
            question.name
          ] = `${question.label} must be at least ${validation.minLength} characters.`;
        }
        if (validation.maxLength && value.length > validation.maxLength) {
          newErrors[
            question.name
          ] = `${question.label} must be at most ${validation.maxLength} characters.`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [config, responses]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(submitSurveyResponse(responses));
    }
  }, [dispatch, responses, validateForm]);

  const renderQuestion = useCallback((question: Question) => {
    const value = responses[question.name];
    const error =
      errors[question.name] ||
      submissionError?.errors?.find(
        (e: { field: string; message: string }) => e.field === question.name
      )?.message;

    switch (question.type) {
      case "text":
      case "textarea":
        return (
          <TextField
            key={question.name}
            question={question}
            value={(value as string) || ""}
            onChange={(val) => handleChange(question.name, val)}
            error={error}
          />
        );
      case "multiple_choice":
        return (
          <MultipleChoiceField
            key={question.name}
            question={question}
            value={(value as string) || ""}
            onChange={(val) => handleChange(question.name, val)}
            error={error}
          />
        );
      case "select":
        return (
          <SelectField
            key={question.name}
            question={question}
            value={(value as string) || ""}
            onChange={(val) => handleChange(question.name, val)}
            error={error}
          />
        );
      case "rating":
        return (
          <RatingField
            key={question.name}
            question={question}
            value={(value as number) || 0}
            onChange={(val) => handleChange(question.name, val)}
            error={error}
          />
        );
      default:
        return null;
    }
  }, [responses, errors, submissionError, handleChange]);

  if (!config) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {config.questions.map(renderQuestion)}
      {submissionError && !submissionError.errors && (
        <p className="text-sm font-medium text-destructive">
          {submissionError.message ?? "An error occurred during submission."}
        </p>
      )}
      <Button
        type="submit"
        disabled={submissionStatus === "loading"}
        className="w-full"
      >
        {submissionStatus === "loading" ? "Submitting..." : "Submit Survey"}
      </Button>
    </form>
  );
};

export default SurveyForm;
