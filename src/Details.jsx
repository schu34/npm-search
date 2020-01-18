import React from "react";
import { useInput, Text } from "ink";

const Details = ({ text }) => {
  useInput(() => {});
  return <Text>details: {text}</Text>;
};

export default Details;
