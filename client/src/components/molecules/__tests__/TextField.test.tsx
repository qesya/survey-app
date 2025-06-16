import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TextField from "../TextField";
import type { Question } from "@/types/survey";

const mockQuestionText: Question = {
  type: "text",
  label: "First Name",
  name: "firstName",
  validation: { required: true, minLength: 2, maxLength: 20 },
};

const mockQuestionTextarea: Question = {
  type: "textarea",
  label: "Bio",
  name: "bio",
  validation: { required: false, minLength: 0, maxLength: 200 },
};

describe("TextField", () => {
  it("renders Input for type 'text' and passes props", () => {
    const { getByLabelText } = render(
      <TextField question={mockQuestionText} value="John" onChange={() => {}} />
    );
    const input = getByLabelText("First Name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "firstName");
    expect(input).toHaveValue("John");
  });

  it("renders Textarea for type 'textarea' and passes props", () => {
    const { getByLabelText } = render(
      <TextField question={mockQuestionTextarea} value="Hello world" onChange={() => {}} />
    );
    const textarea = getByLabelText("Bio");
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveValue("Hello world");
  });

  it("calls onChange with correct value for Input", () => {
    const handleChange = vi.fn();
    const { getByLabelText } = render(
      <TextField question={mockQuestionText} value="" onChange={handleChange} />
    );
    const input = getByLabelText("First Name");
    fireEvent.change(input, { target: { value: "Jane" } });
    expect(handleChange).toHaveBeenCalledWith("Jane");
  });

  it("calls onChange with correct value for Textarea", () => {
    const handleChange = vi.fn();
    const { getByLabelText } = render(
      <TextField question={mockQuestionTextarea} value="" onChange={handleChange} />
    );
    const textarea = getByLabelText("Bio");
    fireEvent.change(textarea, { target: { value: "New bio" } });
    expect(handleChange).toHaveBeenCalledWith("New bio");
  });

  it("renders error message if error prop is provided", () => {
    const { getByText } = render(
      <TextField question={mockQuestionText} value="" onChange={() => {}} error="This field is required" />
    );
    expect(getByText("This field is required")).toBeInTheDocument();
  });
});
