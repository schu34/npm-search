import React from "react";
import { Text } from "ink";
import PropTypes from "prop-types";

const PackageLine = ({ packageName, ...props }) => {
  return <Text {...props}>{packageName}</Text>;
};

PackageLine.propTypes = {
  packageName: PropTypes.string.isRequired,
};

export default PackageLine;
