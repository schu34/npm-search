import React from "react";
import fs from "fs";
import Markdown, { stripHashes } from "../src/Markdown";
import { render } from "ink-testing-library";

// This is required to normalize snapshot testing across
// different terminals. It's not ideal since we can't test
// to make sure styling is happening correctly.

import Chalk from "chalk";
Chalk.level = 0;

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

describe("stripHashes", () => {
  it("should strip one hash", () => {
    expect(stripHashes("#hello")).toBe("hello");
  });
  it("should strip many hashes", () => {
    expect(stripHashes("#####hello")).toBe("hello");
  });
  it("should preserve spaces in the string", () => {
    expect(stripHashes("###hello hello")).toBe("hello hello");
  });
});
