import React from "react";
import PropTypes from "prop-types";
import { Color } from "ink";

const Loading = ({ message }) => <Color blue> {message} </Color>;

Loading.propTypes = {
  message: PropTypes.string.isRequired
};

export default Loading;
