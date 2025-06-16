import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Textarea } from "../Textarea";

describe("Textarea", () => {
  it("renders textarea element", () => {
    const { getByRole } = render(<Textarea />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("applies className prop", () => {
    const { getByRole } = render(<Textarea className="custom-class" />);
    expect(getByRole("textbox").className).toMatch(/custom-class/);
  });

  it("is disabled when disabled prop is set", () => {
    const { getByRole } = render(<Textarea disabled />);
    expect(getByRole("textbox")).toBeDisabled();
  });

  it("forwards other props", () => {
    const { getByPlaceholderText } = render(<Textarea placeholder="Type here" />);
    expect(getByPlaceholderText("Type here")).toBeInTheDocument();
  });
});
