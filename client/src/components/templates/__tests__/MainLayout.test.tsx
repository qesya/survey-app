import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MainLayout from "../MainLayout";


describe("MainLayout", () => {
  it("renders children inside main content area", () => {
    const { getByText } = render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom className to main content area", () => {
    const { container } = render(
      <MainLayout className="custom-class">
        <div>Content</div>
      </MainLayout>
    );
    const main = container.querySelector("main");
    expect(main).toHaveClass("custom-class");
  });

  it("renders with correct layout structure", () => {
    const { container } = render(
      <MainLayout>
        <span>Child</span>
      </MainLayout>
    );
    const outer = container.querySelector("div");
    expect(outer).toHaveClass("min-h-screen");

    const main = container.querySelector("main");
    expect(main).toHaveClass("max-w-4xl");
    expect(main).toHaveClass("bg-white");
    expect(main).toHaveClass("shadow-md");
    expect(main).toHaveClass("rounded-lg");
    expect(main).toHaveClass("p-6");
  });
});
