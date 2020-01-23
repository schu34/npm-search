import React from "react";
import { useInput, Text, Box } from "ink";

const Details = ({ details }) => {
  return (
    <Box flexDirection={"column"}>
      {details.split("\n").map(line => (
        <Text>{line}</Text>
      ))}
    </Box>
  );
};

export default Details;
