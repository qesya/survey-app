import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RatingField from "../RatingField";
import type { Question } from "@/types/survey";

const mockQuestion: Question = {
  type: "rating",
  label: "Rate this product",
  name: "rating",
  scale: 5,
  validation: { required: true },
};

describe("RatingField", () => {
  it("renders the correct number of stars and label", () => {
    const { getByText, getAllByLabelText } = render(
      <RatingField question={mockQuestion} value={0} onChange={() => {}} />
    );
    expect(getByText("Rate this product")).toBeInTheDocument();
    expect(getAllByLabelText(/Rate/).length).toBe(5);
  });

  it("highlights the correct number of stars based on value", () => {
    const { getAllByLabelText } = render(
      <RatingField question={mockQuestion} value={3} onChange={() => {}} />
    );
    const stars = getAllByLabelText(/Rate/);
    for (let i = 0; i < 3; i++) {
      expect(stars[i].querySelector("svg")).toHaveClass("fill-current");
    }
    for (let i = 3; i < 5; i++) {
      expect(stars[i].querySelector("svg")).toHaveClass("fill-transparent");
    }
  });

  it("calls onChange with correct value when a star is clicked", () => {
    const handleChange = vi.fn();
    const { getAllByLabelText } = render(
      <RatingField question={mockQuestion} value={0} onChange={handleChange} />
    );
    const stars = getAllByLabelText(/Rate/);
    fireEvent.click(stars[2]);
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it("renders error message if error prop is provided", () => {
    const { getByText } = render(
      <RatingField question={mockQuestion} value={0} onChange={() => {}} error="This field is required" />
    );
    expect(getByText("This field is required")).toBeInTheDocument();
  });
});
