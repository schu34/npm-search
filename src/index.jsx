import React, { useState, useEffect } from "react";
import { render, Box, Text, useInput, useApp, Color } from "ink";
import getPackageReadme from "get-package-readme";
import { getScreenWidth, getScreenHeight } from "./utils";
import _Results from "./Results";
import _Search from "./Search";
import _Details from "./Details";

const Loading = () => <Text>Loading...</Text>;

const withLoading = Component => ({ loading, ...props }) => {
  return loading ? <Loading /> : <Component {...props} />;
};

const getReadme = packageName =>
  new Promise((resolve, reject) => {
    getPackageReadme(packageName, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });

const Results = withLoading(_Results);
const Search = withLoading(_Search);
const Details = withLoading(_Details);

const App = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState(null);
  const [activeScreen, setScreen] = useState("search");
  const [details, setDetails] = useState(null);

  const { exit } = useApp();

  const getDetails = () => {
    setLoading(true);
    getReadme(results[selection]).then(text => {
      setDetails(`details for ${selection}, ${results[selection]}\n` + text);
      setScreen("details");
      setLoading(false);
    });
  };

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
          getDetails();
        }}
      />
    ),
    details: <Details details={details} />
  };

  return (
    <Box
      width={getScreenWidth()}
      height={getScreenHeight()}
      flexDirection={"column"}
    >
      {screens[activeScreen]}
    </Box>
  );
};

render(<App />, { experimental: true });
