import getReadme from "get-package-readme";
import npmRegistryFetch from "npm-registry-fetch";
import fetch from "node-fetch";

export const getPackageReadme = (packageName) => {
  console.log("packageName", packageName);
  return new Promise((resolve, reject) => {
    getReadme(packageName, (err, readme) =>
      err ? reject(err) : resolve(readme)
    );
  });
};
getPackageReadme("express");

export const getDetailsForSearch = async (search) => {
  try {
    const packages = await npmSearch(search);
    const details = await getPackageDetails(packages);
    return details;
  } catch (err) {
    console.log(err);
  }
};

const npmSearch = async (search) => {
  const apiResult = await npmRegistryFetch.json(`/-/v1/search?text=${search}`);
  return apiResult.objects.map((obj) => obj.package);
};

const getDownloadCount = async (packageName) => {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/last-week/${packageName}`
    );
    const parsed = await res.json();
    return parsed;
  } catch (e) {
    return { downloads: 0 };
  }
};

const withTimeout = (timeout, f) => async (...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const message = `${[...args].join()} request timed out`;
      reject(message);
    }, timeout);
    f(...args)
      .then(resolve)
      .catch(reject);
  });
};

const getDeets = async (p) => {
  try {
    return await withTimeout(2000, async () => {
      const deets = await npmRegistryFetch(`/${p}/latest`);
      return deets.json();
    })();
  } catch (e) {
    console.log("in getDeets", p, e);
    return {};
  }
};

const getPackageDetails = async (packages) => {
  packages = Array.isArray(packages) ? packages : [packages];
  try {
    return await Promise.all(
      packages.map(async (p) => {
        const [details, downloadsData] = await Promise.all([
          getDeets(p.name),
          getDownloadCount(p.name),
        ]);
        return {
          ...p,
          downloads: downloadsData.downloads,
          ...details,
        };
      })
    );
  } catch (e) {
    console.log("in getPackageDetails", e);
  }
};

getDetailsForSearch("express");
