import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "ink";
import Loading from "./Loading";
import useDimensions from "ink-use-stdout-dimensions";
import { getPackageReadme } from "./utils";
import Markdown from "./Markdown";

const Details = ({ selection }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [width, height] = useDimensions();

  useEffect(() => {
    console.log("selection", selection);
    getPackageReadme(selection)
      .then((result) => {
        console.log("results", result);
        setDetails(result);
        setLoading(false);
      })
      .catch((err) => {
        setDetails(`ERROR fetching ${selection}\n ${err}`);
        setLoading(false);
      });
  }, [selection]);

  return loading ? (
    <Loading message="getting packge details" />
  ) : (
    <Box flexDirection={"column"}>
      <Markdown width={width} height={height} source={details} />
    </Box>
  );
};

Details.propTypes = {
  selection: PropTypes.string,
};

Details.defaultProps = {
  selection: "",
};
export default Details;
