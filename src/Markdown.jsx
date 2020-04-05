import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, useInput, Text } from "ink";

export const Title = ({ ...props }) => <Text {...props} bold />;

export const stripHashes = (str) =>
  str
    .split("")
    .filter((c) => c !== "#")
    .join("");

const Markdown = ({ source, width, height }) => {
  const [formattedSource, setFormattedSource] = useState([]);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const splitSource = source.split("\n");
    const lines = splitSource.reduce((result, nextLine, lineNumber) => {
      const linesToAppend = [];
      let currentLine = "";
      let words = nextLine.split(" ");
      let Component = Text;
      if (nextLine[0] === "#") {
        words = stripHashes(nextLine).trim().split(" ");
        Component = Title;
      }
      if (!nextLine.length) return result.concat(" ");
      for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (currentLine.length + word.length + 1 <= width) {
          currentLine += i !== 0 ? ` ${word}` : word;
        } else {
          /* TODO: currently assuming that the window won't be
           * so narrow that one word is too wide for a line.
           * this should be handled better though (maybe we can hyphenate?)
           */
          linesToAppend.push(
            <Component key={currentLine + i + lineNumber}>
              {currentLine}
            </Component>
          );
          currentLine = word;
        }
      }
      if (currentLine.length)
        linesToAppend.push(
          <Component key={`${currentLine}last${lineNumber}`}>
            {currentLine}
          </Component>
        );

      return result.concat(linesToAppend);
    }, []);
    setFormattedSource(lines);
  }, [source, width, height]);

  useInput((input, key) => {
    if (key.upArrow || input === "k") {
      return setTop(Math.max(top - 1, 0));
    }

    if (key.downArrow || input === "j") {
      return setTop(Math.min(formattedSource.length - height, top + 1));
    }
  });

  return (
    <Box flexDirection={"column"} width={width} height={height}>
      {formattedSource.slice(top, top + height - 1)}
    </Box>
  );
};

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Markdown;
