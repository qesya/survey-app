import React from "react";

import { Label } from "@/components/atoms/Label";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/RadioGroup";
import FormField from "./FormField";
import { type Question } from "@/features/survey/surveySlice";

interface MultipleChoiceFieldProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const MultipleChoiceField: React.FC<MultipleChoiceFieldProps> = ({
  question,
  value,
  onChange,
  error,
}) => {
  return (
    <FormField label={question.label} htmlFor={question.name} error={error}>
      <RadioGroup
        name={question.name}
        value={value}
        onValueChange={onChange}
        required={question.validation.required}
      >
        {question.options?.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${question.name}-${option}`} />
            <Label htmlFor={`${question.name}-${option}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </FormField>
  );
};

export default MultipleChoiceField;
