import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchSurveyConfig } from "@/features/survey/surveyThunks";
import MainLayout from "@/components/templates/MainLayout";
import SurveyForm from "@/components/organisms/SurveyForm";
import { Button } from "@/components/atoms/Button";
import { resetSubmissionStatus } from "@/features/survey/surveySlice";

const SurveyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { config, status, error, submissionStatus } = useAppSelector(
    (state) => state.survey
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSurveyConfig());
    }
  }, [status, dispatch]);

  const handleStartOver = () => {
    dispatch(resetSubmissionStatus());
    dispatch(fetchSurveyConfig());
  };

  let content;

  if (status === "loading") {
    content = <p className="text-center text-gray-500">Loading Survey...</p>;
  } else if (status === "failed") {
    content = (
      <p className="text-center text-red-500">
        Error: {error?.message ?? "Failed to load survey."}
      </p>
    );
  } else if (submissionStatus === "succeeded") {
    content = (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Thank You!</h2>
        <p className="mb-6">Your response has been submitted successfully.</p>
        <Button onClick={handleStartOver}>Submit Another Response</Button>
      </div>
    );
  } else if (config) {
    content = (
      <>
        <h1 className="text-3xl font-bold text-center mb-2">{config.title}</h1>
        <p className="text-center text-gray-500 mb-8">
          Please fill out the form below.
        </p>
        <SurveyForm />
      </>
    );
  }

  return <MainLayout>{content}</MainLayout>;
};

export default SurveyPage;
