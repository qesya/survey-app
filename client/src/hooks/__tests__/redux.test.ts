import { describe, it, expect, vi } from "vitest";

// Move this to the top and use a factory for mocking
vi.mock("react-redux", () => {
  return {
    __esModule: true,
    ...vi.importActual("react-redux"),
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});
import * as reactRedux from "react-redux";
import * as reduxHooks from "../redux";

describe("redux hooks", () => {
  it("useAppDispatch returns useDispatch with correct type", () => {
    const mockDispatch = vi.fn();
    (reactRedux.useDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockDispatch);
    const dispatch = reduxHooks.useAppDispatch();
    expect(dispatch).toBe(mockDispatch);
  });

  it("useAppSelector is useSelector", () => {
    expect(reduxHooks.useAppSelector).toBe(reactRedux.useSelector);
  });
});
