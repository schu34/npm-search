import React from "react";
import Details from "../src/Details";
import { render } from "ink-testing-library";

jest.mock("../src/utils");

describe("<Loading />", () => {
  it("should render loading screen", () => {
    const props = {
      selection: "express",
    };
    const { lastFrame } = render(<Details {...props} />);
    expect(lastFrame()).toMatch("getting packge details");
  });
});
