import axios from "axios";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { useApi } from "../useApi";

vi.mock("axios");
const mockedAxios = axios as unknown as { get: Mock; post: Mock };

beforeEach(() => {
  import.meta.env.VITE_API_BASE_URL = "http://localhost/api";
  vi.clearAllMocks();
});

describe("useApi hook", () => {
  it("apiGet calls axios.get with correct URL and headers", async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: "ok" });
    const { result } = renderHook(() => useApi());
    await act(async () => {
      await result.current.apiGet("/test", { authToken: "token123", headers: { "X-Test": "1" } });
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:3001/api/test",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token123",
          "X-Test": "1",
        }),
      })
    );
  });

  it("apiGet works without authToken", async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: "ok" });
    const { result } = renderHook(() => useApi());
    await act(async () => {
      await result.current.apiGet("/test");
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:3001/api/test",
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it("apiPost calls axios.post with correct URL, data, and headers", async () => {
    mockedAxios.post = vi.fn().mockResolvedValue({ data: "ok" });
    const { result } = renderHook(() => useApi());
    await act(async () => {
      await result.current.apiPost("/test", { foo: "bar" }, { authToken: "token123", headers: { "X-Test": "1" } });
    });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3001/api/test",
      { foo: "bar" },
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token123",
          "X-Test": "1",
        }),
      })
    );
  });

  it("apiPost works without authToken", async () => {
    mockedAxios.post = vi.fn().mockResolvedValue({ data: "ok" });
    const { result } = renderHook(() => useApi());
    await act(async () => {
      await result.current.apiPost("/test", { foo: "bar" });
    });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3001/api/test",
      { foo: "bar" },
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });
});
