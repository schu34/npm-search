import React from "react";
import Search from "../src/Search";
import { render } from "ink-testing-library";

describe("<Search />", () => {
  it("should render without errors", () => {
    const props = {
      value: "",
      onChange: () => {},
      getResults: () => {}
    };
    const { lastFrame } = render(<Search {...props} />);
    expect(lastFrame()).toMatch("search for a package");
  });
});
