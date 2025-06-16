import React from "react";
import { Input } from "@/components/atoms/Input";
import FormField from "./FormField";
import { type Question } from "@/features/survey/surveySlice";
import { Textarea } from "@/components/atoms/Textarea";

interface TextFieldProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  question,
  value,
  onChange,
  error,
}) => {
  const commonProps = {
    id: question.name,
    name: question.name,
    value: value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    required: question.validation.required,
    minLength: question.validation.minLength,
    maxLength: question.validation.maxLength,
  };

  return (
    <FormField label={question.label} htmlFor={question.name} error={error}>
      {question.type === "textarea" ? (
        <Textarea {...commonProps} />
      ) : (
        <Input type="text" {...commonProps} />
      )}
    </FormField>
  );
};

export default TextField;
