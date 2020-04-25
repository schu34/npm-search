import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, useInput, Color, Text } from "ink";
import useDimensions from "ink-use-stdout-dimensions";
import npmRegistryFetch from "npm-registry-fetch";
import Loading from "./Loading";
import PackageLine from "./PackageLine";
import { getDetailsForSearch } from "./utils";

const clamp = (number, min, max) => Math.min(max, Math.max(number, min));

const npmSearch = async (search) => {
  const apiResult = await npmRegistryFetch.json(`/-/v1/search?text=${search}`);
  return apiResult.objects.map((obj) => obj.package);
};

const getDownloadCount = async (packageName) => {
  try {
    const res = await npmRegistryFetch(
      `downloads/point/last-week/${packageName}`
    );
    return res;
  } catch (e) {
    return { downloads: 0 };
  }
};

const getPackageDetails = async (packages) => {
  packages = Array.isArray(packages) ? packages : [packages];
  return await Promise.all(
    packages.map(async (p) => {
      const [details, downloadsData] = await Promise.all([
        npmRegistryFetch(`/${p.name}/latest`),
        getDownloadCount(p.name),
      ]);
      return {
        ...p,
        downloads: downloadsData.downloads,
        version: details.version,
      };
    })
  );
};

const Results = ({ search, select }) => {
  const [top, setTop] = useState(0);
  const [selection, setSelection] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const height = useDimensions()[1];

  const maxRows = Math.min(height - 2, results.length);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const returnedResults = await getDetailsForSearch(search);
        // const enrichedResults = await getDetailsForSearch(returnedResults);
        setLoading(false);
        setResults(returnedResults);
      } catch (e) {
        setLoading(false);
        setResults([{ name: `error: ${e}` }]);
        setLoading(false);
      }
    })();
  }, [search]);

  useInput((input, key) => {
    if (loading) return;
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
      select(results[selection].name);
    }
  });

  return loading ? (
    <Loading message="searching for packages..." />
  ) : (
    <Box width={"100%"} height={"100%"} flexDirection="column">
      {results.slice(top, top + maxRows).map((res, i) => {
        return i === selection ? (
          <Box key={res.name}>
            <Color blue>❯ </Color>
            <PackageLine bold packageName={res.name} />
          </Box>
        ) : (
          <>
            <PackageLine packageName={`  ${res.name}`} />
          </>
        );
      })}
      <Box>
        {top + maxRows} {results.length}
      </Box>
    </Box>
  );
};

Results.propTypes = {
  search: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
};

export default Results;
