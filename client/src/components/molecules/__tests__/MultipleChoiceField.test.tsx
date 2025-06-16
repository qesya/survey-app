import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MultipleChoiceField from "../MultipleChoiceField";
import type { Question } from "@/types/survey";

const mockQuestion: Question = {
  type: "multiple_choice",
  label: "Favorite color?",
  name: "favoriteColor",
  options: ["Red", "Blue", "Green"],
  validation: { required: true },
};

describe("MultipleChoiceField", () => {
  it("renders label and radio options", () => {
    const { getByText, getByLabelText } = render(
      <MultipleChoiceField
        question={mockQuestion}
        value=""
        onChange={() => {}}
      />
    );
    expect(getByText("Favorite color?")).toBeInTheDocument();
    expect(getByLabelText("Red")).toBeInTheDocument();
    expect(getByLabelText("Blue")).toBeInTheDocument();
    expect(getByLabelText("Green")).toBeInTheDocument();
  });

  it("checks the correct radio when value is set", () => {
    const { getByLabelText } = render(
      <MultipleChoiceField
        question={mockQuestion}
        value="Blue"
        onChange={() => {}}
      />
    );
    expect(getByLabelText("Blue")).toBeChecked();
  });
});
