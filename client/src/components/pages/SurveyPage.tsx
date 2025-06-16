import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchSurveyConfig, submitSurvey } from '@/features/survey/surveySlice';
import SurveyForm from '@/components/survey/SurveyForm';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SurveyPage = () => {
  const dispatch = useAppDispatch();
  const { config, loading, error } = useAppSelector((state) => state.survey);

  useEffect(() => {
    dispatch(fetchSurveyConfig());
  }, [dispatch]);

  const handleSubmit = async (responses: Record<string, string | number>) => {
    await dispatch(submitSurvey(responses));
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!config) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{config.title}</h1>
        <SurveyForm config={config} onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default SurveyPage;
