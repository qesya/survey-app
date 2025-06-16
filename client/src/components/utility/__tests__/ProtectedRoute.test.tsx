import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProtectedRoute from "../ProtectedRoute";
import * as reduxHooks from "@/hooks/redux";
import { MemoryRouter } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => <div data-testid="navigate" data-to={to} />,
    Outlet: () => <div data-testid="outlet" />,
  };
});

describe("ProtectedRoute", () => {
  it("renders Outlet when authenticated", () => {
    vi.spyOn(reduxHooks, "useAppSelector").mockReturnValue({ isAuthenticated: true });
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );
    expect(getByTestId("outlet")).toBeInTheDocument();
    expect(queryByTestId("navigate")).toBeNull();
  });

  it("redirects to /login when not authenticated", () => {
    vi.spyOn(reduxHooks, "useAppSelector").mockReturnValue({ isAuthenticated: false });
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );
    expect(getByTestId("navigate")).toHaveAttribute("data-to", "/login");
    expect(queryByTestId("outlet")).toBeNull();
  });
});
