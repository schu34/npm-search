import React from "react";
import Results from "../src/Results";
import { render } from "ink-testing-library";

describe("<Results />", () => {
  it("should render without errors", () => {
    const props = {
      search:"express",
      select:()=>{}
    };
    const { lastFrame } = render(<Results {...props} />);
    expect(lastFrame()).toMatch("searching for packages...");
  });
});
