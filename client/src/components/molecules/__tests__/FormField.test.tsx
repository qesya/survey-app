import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormField from "../FormField";

describe("FormField", () => {
  it("renders label and children", () => {
    const { getByText, getByLabelText } = render(
      <FormField label="Username" htmlFor="username">
        <input id="username" />
      </FormField>
    );
    expect(getByText("Username")).toBeInTheDocument();
    expect(getByLabelText("Username")).toBeInTheDocument();
  });

  it("renders error message when error prop is provided", () => {
    const { getByText } = render(
      <FormField label="Email" htmlFor="email" error="Required">
        <input id="email" />
      </FormField>
    );
    expect(getByText("Required")).toBeInTheDocument();
    expect(getByText("Required")).toHaveClass("text-destructive");
  });

  it("does not render error message when error prop is not provided", () => {
    const { queryByText } = render(
      <FormField label="Email" htmlFor="email">
        <input id="email" />
      </FormField>
    );
    expect(queryByText("text-destructive")).not.toBeInTheDocument();
  });
});
