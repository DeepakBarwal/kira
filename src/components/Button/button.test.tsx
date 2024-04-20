import { describe, expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Button } from "./index";

describe("Button Tests", () => {
  test("should render button", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);

    const element = screen.getByTestId("button-test");
    expect(element).toBeTruthy();
  });
});
