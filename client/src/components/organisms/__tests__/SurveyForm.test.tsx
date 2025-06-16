import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import SurveyForm from "../SurveyForm";
import * as reduxHooks from "@/hooks/redux";

const mockDispatch = vi.fn();

const mockConfig = {
  title: "Mock Survey",
  questions: [
    {
      type: "text" as const,
      label: "Name",
      name: "name",
      validation: { required: true, minLength: 2, maxLength: 20 },
    },
    {
      type: "multiple_choice" as const,
      label: "Color",
      name: "color",
      options: ["Red", "Blue"],
      validation: { required: true },
    },
    {
      type: "select" as const,
      label: "Country",
      name: "country",
      options: ["USA", "Canada"],
      validation: { required: true },
    },
    {
      type: "rating" as const,
      label: "Satisfaction",
      name: "satisfaction",
      scale: 5,
      validation: { required: true },
    },
  ],
};

type SubmissionStatus = "idle" | "loading" | "succeeded" | "failed";

const mockState = {
  survey: {
    config: mockConfig,
    responses: { name: "", color: "", country: "", satisfaction: 0 },
    submissionStatus: "idle" as SubmissionStatus,
    submissionError: null,
    // Add missing SurveyState properties
    status: "idle" as SubmissionStatus,
    error: null,
  },
  auth: {
    isAuthenticated: false,
    user: null,
    userEmail: null,
    token: null,
    loading: false,
    error: null,
    // Add any other missing AuthState properties if needed
  },
};

describe("SurveyForm", () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() { return null; }
      unobserve() { return null; }
      disconnect() { return null; }
    };
  });

  beforeEach(() => {
    vi.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(mockDispatch);
    vi.spyOn(reduxHooks, "useAppSelector").mockImplementation((cb: (state: typeof mockState) => unknown) => cb(mockState));
  });

  it("renders all questions and submit button", () => {
    const { getByText, getByLabelText } = render(<SurveyForm />);
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByText("Color")).toBeInTheDocument();
    expect(getByText("Red")).toBeInTheDocument();
    expect(getByText("Blue")).toBeInTheDocument();
    expect(getByText("Country")).toBeInTheDocument();
    expect(getByText("USA")).toBeInTheDocument();
    expect(getByText("Canada")).toBeInTheDocument();
    expect(getByText("Satisfaction")).toBeInTheDocument();
    expect(getByText("Submit Survey")).toBeInTheDocument();
  });

  it("dispatches submitSurveyResponse when form is valid", () => {
    const filledState = {
      survey: {
        ...mockState.survey,
        responses: {
          name: "John",
          color: "Red",
          country: "USA",
          satisfaction: 5,
        },
        status: "idle" as SubmissionStatus,
      },
      auth: {
        ...mockState.auth,
        userEmail: null,
      },
    };
    vi.spyOn(reduxHooks, "useAppSelector").mockImplementation((cb: (state: typeof mockState) => unknown) => cb(filledState));
    const { getByText } = render(<SurveyForm />);
    fireEvent.click(getByText("Submit Survey"));
    expect(mockDispatch).toHaveBeenCalled();
  });
});
