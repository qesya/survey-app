import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn utility", () => {
  it("returns a single class if only one is provided", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple classes", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles falsy values", () => {
    expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
  });

  it("deduplicates and merges tailwind classes", () => {
    expect(cn("p-2", "p-4", "text-sm", "text-lg")).toBe("p-4 text-lg");
  });

  it("handles objects and arrays", () => {
    expect(cn(["foo", { bar: true, baz: false }])).toBe("foo bar");
  });

  it("returns an empty string if nothing is passed", () => {
    expect(cn()).toBe("");
  });
});
