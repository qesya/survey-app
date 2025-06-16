import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant and size classes", () => {
    render(<Button variant="destructive" size="lg">Delete</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/bg-destructive/);
    expect(button.className).toMatch(/h-11/);
  });

  it("handles click events", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as a child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="https://example.com">Link</a>
      </Button>
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
