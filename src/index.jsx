import React, { useState } from "react";
import { render, Box, useInput, useApp } from "ink";
import useDimensions from "ink-use-stdout-dimensions";
import Results from "./Results";
import Search from "./Search";
import Details from "./Details";

const App = () => {
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState(null);
  const [activeScreen, setScreen] = useState("search");

  const [width, height] = useDimensions();
  const { exit } = useApp();

  useInput(input => {
    if (activeScreen !== "search") {
      switch (input) {
        case "s":
          setSearch("");
          setScreen("search");
          break;
        case "r":
          setScreen("results");
          break;
        case "q":
          exit();
          break;
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
