import React, { useState } from "react";
import { Box, useInput } from "ink";
import { getScreenHeight } from "./utils";

const clamp = (number, min, max) => Math.min(max, Math.max(number, min));

const Results = ({ results, select }) => {
	const maxRows = Math.min(getScreenHeight() - 2, results.length);

	const [top, setTop] = useState(0);
	const [selection, setSelection] = useState(0);

	useInput((input, key) => {
		if (input === "j" || key.downArrow) {
			setSelection(clamp(selection + 1, 0, maxRows - 1));
		}
		if (input === "k" || key.upArrow) {
			setSelection(clamp(selection - 1, 0, maxRows - 1));
		}
		if (key.return) {
			select(selection);
		}
	});

	return (
		<Box width={"100%"} height={"100%"} flexDirection="column">
			{results.slice(top, top + maxRows).map((res, i) => {
				return i === selection ? "❯ " + res.name : "  " + res.name;
			})}
		</Box>
	);
};

export default Results;
