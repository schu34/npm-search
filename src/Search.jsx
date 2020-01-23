import React from "react";
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

export default Search;
