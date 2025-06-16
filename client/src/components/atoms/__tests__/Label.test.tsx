import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "../Label";

describe("Label", () => {
  it("renders children", () => {
    const { getByText } = render(<Label>Label text</Label>);
    expect(getByText("Label text")).toBeInTheDocument();
  });

  it("applies className prop", () => {
    const { getByText } = render(<Label className="custom-label">Label</Label>);
    expect(getByText("Label").className).toMatch(/custom-label/);
  });

  it("forwards other props", () => {
    const { getByText } = render(<Label htmlFor="input-id">Label</Label>);
    expect(getByText("Label")).toHaveAttribute("for", "input-id");
  });
});
