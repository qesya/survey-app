import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { PublicLayout } from "../Layout";

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet" />,
    Link: actual.Link,
  };
});

describe("PublicLayout", () => {
  it("renders header with Admin Login button and link", () => {
    const { getByText } = render(
      <MemoryRouter>
        <PublicLayout />
      </MemoryRouter>
    );
    const link = getByText("Admin Login");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/login");
    const buttonParent = link.closest("button");
    expect(buttonParent).toBeNull();
  });

  it("renders the Outlet (main content)", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <PublicLayout />
      </MemoryRouter>
    );
    expect(getByTestId("outlet")).toBeInTheDocument();
  });
});
