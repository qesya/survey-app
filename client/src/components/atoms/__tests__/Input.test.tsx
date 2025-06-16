import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "../Input";

describe("Input", () => {
  it("renders input element", () => {
    const { getByRole } = render(<Input />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("applies className prop", () => {
    const { getByRole } = render(<Input className="custom-class" />);
    expect(getByRole("textbox").className).toMatch(/custom-class/);
  });

  it("passes type prop", () => {
    const { getByRole } = render(<Input type="email" />);
    expect(getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("is disabled when disabled prop is set", () => {
    const { getByRole } = render(<Input disabled />);
    expect(getByRole("textbox")).toBeDisabled();
  });

  it("forwards other props", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Type here" />);
    expect(getByPlaceholderText("Type here")).toBeInTheDocument();
  });
});
