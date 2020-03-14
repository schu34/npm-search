import React from "react";
import { App } from "../src";
import { render } from "ink-testing-library";

describe("<App />", () => {
  it("should render without errors", () => {
    const { lastFrame } = render(<App />);
    expect(lastFrame()).toMatch("search for a package");
  });
});
