import React, { useState } from "react";
import axios from "axios";

import MainLayout from "@/components/templates/MainLayout";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { useAppDispatch } from "@/hooks/redux";
import { loginSuccess } from "@/features/auth/authSlice";
import { apiPost } from "@/lib/api";

type LoginResponse = {
  token: string;
  email: string;
};

const LoginPage: React.FC<{ onSwitchToSurvey: () => void }> = ({
  onSwitchToSurvey,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiPost<LoginResponse>("/auth/login", {
        email,
        password,
      });
      const data = response.data;
      dispatch(loginSuccess({ token: data.token, email: data.email }));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ?? "Login failed. Please try again."
        );
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout className="max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Button variant="link" onClick={onSwitchToSurvey}>
          Back to Survey
        </Button>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
