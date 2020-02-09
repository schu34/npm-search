import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, useInput, Color, Text } from "ink";
import npmSearch from "libnpmsearch";
import { getScreenHeight } from "./utils";
import Loading from "./Loading";

const clamp = (number, min, max) => Math.min(max, Math.max(number, min));

Results.propTypes = {
  search: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired
};

const Results = ({ search, select }) => {
  const [top, setTop] = useState(0);
  const [selection, setSelection] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const maxRows = Math.min(getScreenHeight() - 2, results.length);

  useEffect(() => {
    setLoading(true);
    npmSearch(search)
      .then(returnedResults => {
        setLoading(false);
        setResults(returnedResults);
        // setScreen("results");
      })
      .catch(() => {
        setLoading(false);
        setResults([{ name: "error" }]);
        setLoading(false);
      });
  }, [search]);

  useInput((input, key) => {
    if (loading) return;
    if (input === "j" || key.downArrow) {
      if (selection === maxRows - 1 && top + maxRows !== results.length) {
        setTop(top + 1);
      } else {
        setSelection(clamp(selection + 1, 0, maxRows - 1));
      }
    }
    if (input === "k" || key.upArrow) {
      if (selection === 0 && top !== 0) {
        setTop(top - 1);
      } else {
        setSelection(clamp(selection - 1, 0, maxRows - 1));
      }
    }
    if (key.return) {
      select(results[selection].name);
    }
  });

  return loading ? (
    <Loading message="searching for packages..." />
  ) : (
    <Box width={"100%"} height={"100%"} flexDirection="column">
      {results.slice(top, top + maxRows).map((res, i) => {
        return i === selection ? (
          <Box>
            <Color blue>❯ </Color>
            <Text bold>{res.name}</Text>
          </Box>
        ) : (
          "  " + res.name
        );
      })}
      <Box>
        {top + maxRows} {results.length}
      </Box>
    </Box>
  );
};

export default Results;
