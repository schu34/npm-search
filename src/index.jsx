import React, { useState, useEffect } from "react";
import { render, Box, Text, useInput, useApp, Color } from "ink";
import npmSearch from "libnpmsearch";
import { getScreenWidth, getScreenHeight } from "./utils";
import _Results from "./Results";
import _Search from "./Search";
import _Details from "./Details";

const Loading = () => <Text>Loading...</Text>;

const withLoading = Component => ({ loading, ...props }) => {
	return loading ? <Loading /> : <Component {...props} />;
};

const Results = withLoading(_Results);
const Search = withLoading(_Search);
const Details = withLoading(_Details);

const App = () => {
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState(null);
	const [selection, setSelection] = useState(null);
	const [activeScreen, setScreen] = useState("search");

	const { exit } = useApp();

	const doSearch = () => {
		setLoading(true);
		npmSearch(search)
			.then(returnedResults => {
				setLoading(false);
				setResults(returnedResults);
				setScreen("results");
			})
			.catch(e => {
				setLoading(false);
				setResults([{ name: "error" }]);
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
				loading={loading}
				value={search}
				onChange={setSearch}
				doSearch={doSearch}
			/>
		),
		results: (
			<Results
				loading={loading}
				results={results}
				select={arg => {
					setSelection(arg);
					setScreen("details");
				}}
			/>
		),
		details: <Details loading={loading} packageName={selection} />
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
