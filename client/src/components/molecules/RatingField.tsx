import React, { useState } from "react";
import { Star } from "lucide-react";
import FormField from "./FormField";
import { type Question } from "@/features/survey/surveySlice";
import { Button } from "../atoms/Button";
import { cn } from "@/lib/utils";

interface RatingFieldProps {
  question: Question;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const RatingField: React.FC<RatingFieldProps> = ({
  question,
  value,
  onChange,
  error,
}) => {
  const scale = question.scale ?? 5;
  const ratings = Array.from({ length: scale }, (_, i) => i + 1);
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  return (
    <FormField label={question.label} htmlFor={question.name} error={error}>
      <div className="flex items-center space-x-1" id={question.name}>
        {ratings.map((ratingValue) => {
          const isFilled = (hoverValue ?? value) >= ratingValue;
          return (
            <Button
              key={ratingValue}
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChange(ratingValue)}
              onMouseEnter={() => setHoverValue(ratingValue)}
              onMouseLeave={() => setHoverValue(undefined)}
              className="text-yellow-400 hover:text-yellow-500 focus-visible:ring-yellow-400"
              aria-label={`Rate ${ratingValue}`}
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  isFilled ? "fill-current" : "fill-transparent"
                )}
              />
            </Button>
          );
        })}
      </div>
    </FormField>
  );
};

export default RatingField;
