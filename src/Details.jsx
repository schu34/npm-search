import React, { useState, useEffect } from "react";
import { useInput, Text, Box } from "ink";
import Loading from "./Loading";
import useDimensions from "ink-use-stdout-dimensions";
import { getPackageDetails, getScreenHeight, getScreenWidth } from "./utils";

const Details = ({ selection }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [maxRows, setMaxRows] = useState(0);
  const [maxCols, setMaxCols] = useState(0);

  const [width, height] = useDimensions();

  useInput((input, key) => {
    if (loading) return;
    if (input === "j" || key.downArrow) {
      if (top + maxRows < details.length) setTop(top + 1);
    }
    if (input === "k" || key.upArrow) {
      if (top > 0) {
        setTop(top - 1);
      }
    }
  });

  useEffect(() => {
    if (details) {
      setMaxRows(Math.min(getScreenHeight() - 2, details.length));
      setMaxCols(getScreenWidth());
    }
  }, [details]);

  useEffect(() => {
    getPackageDetails(selection)
      .then(result => {
        setDetails(result.split("\n"));
        setLoading(false);
      })
      .catch(err => {
        setDetails("ERROR fetching " + selection + " " + err);
        setLoading(false);
      });
  }, [selection]);

  return loading ? (
    <Loading message="getting packge details" />
  ) : (
    <Box flexDirection={"column"}>
      {/* {JSON.stringify(details.slice(top, top + 10), null, 2)} */}
      {details
        .slice(top, top + maxRows)
        .map((line, i) =>
          line ? (
            <Text key={top + i + line}>{line}</Text>
          ) : (
            <Text key={top + i + line}>{"\n\n"}</Text>
          )
        )}
    </Box>
  );
};

export default Details;
