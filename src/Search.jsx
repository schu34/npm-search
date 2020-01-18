import React from "react";
import { useInput } from "ink";
import TextInput from "ink-text-input";

const Search = ({ value, onChange, doSearch }) => {
  useInput((_, key) => {
    if (key.return) doSearch();
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
