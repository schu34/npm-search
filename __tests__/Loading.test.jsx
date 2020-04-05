import React from "react";
import Loading from "../src/Loading";
import { render } from "ink-testing-library";

describe("<Loading />", () => {
  it("should render without errors", () => {
    const props = {
      message: "test test",
    };
    const { lastFrame } = render(<Loading {...props} />);
    expect(lastFrame()).toMatch("test test");
  });
});
