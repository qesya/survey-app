import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SelectField from "../SelectField";
import type { Question } from "@/types/survey";

const mockQuestion: Question = {
  type: "multiple_choice",
  label: "Country",
  name: "country",
  options: ["USA", "Canada", "UK"],
  validation: { required: true },
};

describe("SelectField", () => {
  it("renders error message if error prop is provided", () => {
    const { getByText } = render(
      <SelectField question={mockQuestion} value="" onChange={() => {}} error="This field is required" />
    );
    expect(getByText("This field is required")).toBeInTheDocument();
  });
});
