import React, { useState, Fragment } from "react";
import { Box, useInput, Color, Text } from "ink";
import { getScreenHeight } from "./utils";

const clamp = (number, min, max) => Math.min(max, Math.max(number, min));

const Results = ({ results, select }) => {
	const maxRows = Math.min(getScreenHeight() - 2, results.length);

	const [top, setTop] = useState(0);
	const [selection, setSelection] = useState(0);

	useInput((input, key) => {
		if (input === "j" || key.downArrow) {
			if (selection === maxRows - 1 && top + maxRows !== results.length) {
				setTop(top + 1);
			} else {
				setSelection(clamp(selection + 1, 0, maxRows - 1));
			}
		}
		if (input === "k" || key.upArrow) {
			if (selection === 0 && top !== 0) {
				setTop(top - 1);
			} else {
				setSelection(clamp(selection - 1, 0, maxRows - 1));
			}
		}
		if (key.return) {
			select(selection);
		}
	});

	return (
		<Box width={"100%"} height={"100%"} flexDirection="column">
			{results.slice(top, top + maxRows).map((res, i) => {
				return i === selection ? (
					<Box>
						<Color blue>❯ </Color>
						<Text bold>{res.name}</Text>
					</Box>
				) : (
					"  " + res.name
				);
			})}
			<Box>
				{top + maxRows} {results.length}
			</Box>
		</Box>
	);
};

export default Results;
