import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import FormField from "./FormField";
import { type Question } from "@/features/survey/surveySlice";

interface SelectFieldProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  question,
  value,
  onChange,
  error,
}) => {
  return (
    <FormField label={question.label} htmlFor={question.name} error={error}>
      <Select
        name={question.name}
        value={value}
        onValueChange={onChange}
        required={question.validation.required}
      >
        <SelectTrigger id={question.name}>
          <SelectValue placeholder={`Select ${question.label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {question.options?.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
};

export default SelectField;
