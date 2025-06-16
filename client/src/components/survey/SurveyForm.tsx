import { useSurveyForm } from '@/hooks/useSurveyForm';
import type { SurveyConfig, Question } from '@/types/survey';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SurveyFormProps {
  config: SurveyConfig;
  onSubmit: (responses: Record<string, string | number>) => void;
}

const SurveyForm = ({ config, onSubmit }: SurveyFormProps) => {
  const { values, errors, handleChange, validateForm } = useSurveyForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(config.questions)) {
      onSubmit(values);
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <div key={question.name} className="mb-6">
            <Label htmlFor={question.name}>{question.label}</Label>
            <Input
              id={question.name}
              type="text"
              value={values[question.name] as string || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(question, e.target.value)}
            />
            {errors[question.name] && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors[question.name]}</AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 'multiple_choice':
        return (
          <div key={question.name} className="mb-6">
            <Label>{question.label}</Label>
            <RadioGroup
              value={values[question.name] as string || ''}
              onValueChange={(value: string) => handleChange(question, value)}
              className="mt-2"
            >
              {question.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.name}-${option}`} />
                  <Label htmlFor={`${question.name}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors[question.name] && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors[question.name]}</AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 'rating':
        return (
          <div key={question.name} className="mb-6">
            <Label>{question.label}</Label>
            <RadioGroup
              value={values[question.name]?.toString() || ''}
              onValueChange={(value: string) => handleChange(question, parseInt(value))}
              className="mt-2"
            >
              {Array.from({ length: question.scale || 5 }, (_, i) => i + 1).map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem value={rating.toString()} id={`${question.name}-${rating}`} />
                  <Label htmlFor={`${question.name}-${rating}`}>{rating}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors[question.name] && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors[question.name]}</AlertDescription>
              </Alert>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {config.questions.map(renderQuestion)}
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default SurveyForm; 