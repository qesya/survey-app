import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RadioGroup, RadioGroupItem } from "../RadioGroup";

describe("RadioGroup", () => {
  it("renders radio group and items", () => {
    const { getByRole, getAllByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    expect(getByRole("radiogroup")).toBeInTheDocument();
    expect(getAllByRole("radio").length).toBe(2);
  });

  it("checks the correct item when value is set", () => {
    const { getAllByRole } = render(
      <RadioGroup value="b">
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    expect(getAllByRole("radio")[1]).toBeChecked();
  });

  it("applies className prop to RadioGroupItem", () => {
    const { getByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="a" className="custom-radio" />
      </RadioGroup>
    );
    expect(getByRole("radio").className).toMatch(/custom-radio/);
  });

  it("is disabled when disabled prop is set", () => {
    const { getByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="a" disabled />
      </RadioGroup>
    );
    expect(getByRole("radio")).toBeDisabled();
  });
});
