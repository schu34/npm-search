import React from "react";
import PropTypes from "prop-types";
import { useInput } from "ink";
import TextInput from "ink-text-input";

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.function.isRequired,
  getResults: PropTypes.function.isRequired
};
const Search = ({ value, onChange, getResults }) => {
  useInput((_, key) => {
    if (key.return) getResults();
  });

  return (
    <TextInput
      placeholder={"search for a package"}
      value={value}
      onChange={onChange}
    />
  );
};

export default Search;
