import React, { useState, useEffect } from "react";
import { render, Box, Text, useInput, useApp, Color } from "ink";
import useDimensions from "ink-use-stdout-dimensions";
import Results from "./Results";
import Search from "./Search";
import Details from "./Details";

const App = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState(null);
  const [activeScreen, setScreen] = useState("search");

  const [width, height] = useDimensions();
  const { exit } = useApp();

  useInput((input, key) => {
    if (activeScreen !== "search") {
      switch (input) {
        case "s":
          setSearch("");
          setScreen("search");
          setResults(null);
          break;
        case "r":
          setScreen("results");
          break;
        case "q":
          exit();
        default:
          break;
      }
    }
  });

  const screens = {
    search: (
      <Search
        value={search}
        onChange={setSearch}
        getResults={() => setScreen("results")}
      />
    ),
    results: (
      <Results
        search={search}
        select={arg => {
          setSelection(arg);
          setScreen("details");
        }}
      />
    ),
    details: <Details selection={selection} />
  };

  return (
    <Box
      width={width}
      height={height}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {screens[activeScreen]}
    </Box>
  );
};

render(<App />, { experimental: true });
