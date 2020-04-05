import React from "react";
import PropTypes from "prop-types";
import { useInput } from "ink";
import TextInput from "ink-text-input";

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

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  getResults: PropTypes.func.isRequired,
};
export default Search;
