import React, { useState, useEffect } from "react";
import { Box, useInput, Text } from "ink";

const Markdown = ({ source, width, height }) => {
  const [formattedSource, setFormattedSource] = useState([]);
  const [top, setTop] = useState(1);

  useEffect(() => {
    const splitSource = source.split("\n");
    const lines = splitSource.reduce((result, nextLine, lineNumber) => {
      const linesToAppend = [];
      const words = nextLine.split(" ");
      let currentLine = "";
      for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (currentLine.length + word.length + 1 <= width) {
          currentLine += ` ${word}`;
        } else {
          /* TODO: currently assuming that the window won't be
           * so narrow that one word is too wide for a line.
           * this should be handled better though (maybe we can hyphenate?)
           */
          linesToAppend.push(
            <Text key={currentLine + i + lineNumber}>{currentLine}</Text>
          );
          currentLine = word;
        }
      }
      if (currentLine.length)
        linesToAppend.push(
          <Text key={currentLine + "last" + lineNumber}>{currentLine}</Text>
        );

      return result.concat(linesToAppend);
    }, []);
    setFormattedSource(lines);
  }, [source]);

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

export default Markdown;
