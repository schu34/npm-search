import React from "react";
import fs from "fs";
import Markdown from "../src/Markdown";
import { render } from "ink-testing-library";

const mdString = fs.readFileSync("./readme.md").toString();

describe("<Markdown />", () => {
  it("should render without errors", () => {
    const { lastFrame, rerender } = render(
      <Markdown source={mdString} width={50} height={100} />
    );
    rerender(<Markdown source={mdString} width={50} height={100} />);
    expect(lastFrame()).toMatchSnapshot();
  });
});
