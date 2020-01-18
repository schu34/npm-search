import React, { useState, useEffect } from "react";
import { render, Box, Text, useInput, useApp, Color } from "ink";
import TextInput from "ink-text-input";
import npmSearch from "libnpmsearch";
import { getScreenWidth, getScreenHeight } from "./utils";
import Results from "./Results";

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

const Details = ({ text }) => {
	useInput(() => {});
	return <Text>details: {text}</Text>;
};

const App = () => {
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState(null);
	const [selection, setSelection] = useState(null);
	const { exit } = useApp();

	const doSearch = () => {
		setLoading(true);
		npmSearch(search)
			.then(returnedResults => {
				setResults(returnedResults);
				setLoading(false);
			})
			.catch(e => {
				setResults([{ name: "error" }]);
				setLoading(false);
			});
	};

	return (
		<Box
			width={getScreenWidth()}
			height={getScreenHeight()}
			flexDirection={"column"}
		>
			{loading ? (
				"loading..."
			) : results ? (
				selection === null ? (
					<Results results={results} select={setSelection} />
				) : (
					<Details text={results[selection].description} />
				)
			) : (
				<Search value={search} onChange={setSearch} doSearch={doSearch} />
			)}
		</Box>
	);
};

render(<App />, { experimental: true });
