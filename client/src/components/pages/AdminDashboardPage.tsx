import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import MainLayout from "@/components/templates/MainLayout";
import { Button } from "@/components/atoms/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";
import type { Sentiment, StoredResponse } from "@/types/survey";
import { apiGet, apiPost } from "@/lib/api";

type SentimentResult = { loading: true } | ({ loading?: false } & Sentiment);

const AdminDashboardPage: React.FC = () => {
  const [responses, setResponses] = useState<StoredResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sentimentResults, setSentimentResults] = useState<{
    [key: number]: SentimentResult;
  }>({});

  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponses = async () => {
      if (!token) {
        setError("Not authenticated.");
        setLoading(false);
        return;
      }
      try {
        const response = await apiGet<StoredResponse[]>(
          "/admin/responses",
          { authToken: token }
        );
        setResponses(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? "Failed to fetch responses.");
        } else {
          setError("Failed to fetch responses.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [token]);

  const handleAnalyze = useCallback(
    async (responseId: number, text: string) => {
      if (!token) return;
      setSentimentResults((prev) => ({
        ...prev,
        [responseId]: { loading: true },
      }));
      try {
        const response = await apiPost<Sentiment>(
          "/admin/analyze",
          { text },
          { authToken: token }
        );
        setSentimentResults((prev) => ({
          ...prev,
          [responseId]: response.data,
        }));
      } catch {
        setError("Failed to analyze sentiment.");
        setSentimentResults((prev) => {
          const newState = { ...prev };
          delete newState[responseId];
          return newState;
        });
      }
    },
    [token]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  const getSentimentBadgeColor = useCallback((category: string) => {
    if (category === "Positive") return "bg-green-100 text-green-800";
    if (category === "Negative") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  }, []);

  const renderSentimentDetails = useCallback(
    (result: Sentiment | { loading: boolean } | undefined) => {
      if (!result) return null;
      if ("loading" in result && result.loading) {
        return <p className="text-sm text-gray-500">Analyzing...</p>;
      }

      const sentiment = result as Sentiment;

      return (
        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getSentimentBadgeColor(
                sentiment.category
              )}`}
            >
              {sentiment.category} (Score: {sentiment.score.toFixed(2)})
            </span>
          </div>
          {(sentiment.positiveWords.length > 0 ||
            sentiment.negativeWords.length > 0) && (
            <div className="text-xs">
              <p className="font-semibold">Reason:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {sentiment.positiveWords.map((word) => (
                  <span
                    key={word}
                    className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full"
                  >
                    {word}
                  </span>
                ))}
                {sentiment.negativeWords.map((word) => (
                  <span
                    key={word}
                    className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    },
    [getSentimentBadgeColor]
  );

  if (loading) {
    return (
      <MainLayout>
        <p>Loading dashboard...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="space-y-4">
        {responses.length === 0 ? (
          <p>No responses yet.</p>
        ) : (
          responses.map((res) => (
            <div key={res.id} className="p-4 border rounded-lg bg-gray-50">
              <p>
                <strong>Name:</strong> {res.answers.name}
              </p>
              <p>
                <strong>Rating:</strong> {res.answers.rating}/5
              </p>
              {res.answers.feedback && (
                <div className="mt-2 p-3 bg-white rounded border">
                  <p className="italic">"{res.answers.feedback}"</p>
                  <div className="mt-2 flex items-start gap-4">
                    <Button
                      size="sm"
                      onClick={() =>
                        handleAnalyze(res.id, res.answers.feedback!)
                      }
                    >
                      Analyze
                    </Button>
                    <div className="flex-1">
                      {renderSentimentDetails(sentimentResults[res.id])}
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <p className="text-red-500 mt-2">{error}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                 {res.created_at ? (
                  <>{format(new Date(res.created_at), "MMM dd, yyyy h:mm a")}</>
                 ) : (
                  "Unknown date"
                 )}
              </p>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default AdminDashboardPage;
