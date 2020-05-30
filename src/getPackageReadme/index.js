import fetch from "node-fetch";
import gh from "github-url-to-object";
var GITHUB_README = "https://raw.githubusercontent.com/%s";

export default async function getPackageReadme(packageName) {
  const npmUrl = `https://registry.npmjs.org/${packageName}`;
  const data = await fetch(npmUrl);
  const parsedData = await data.json();
  if (parsedData.readme) {
    return parsedData.readme;
  }
  console.log(parsedData);

  const { readmeFilename } = parsedData;
  if (!readmeFilename) {
    throw new Error(`${packageName}: package.json has no readmeFilename`);
  }

  const repoUrl = parsedData.repository && parsedData.repository.url;
  if (!repoUrl) {
    throw new Error(`${packageName}: package.json has no repository`);
  }
  const repoObj = gh(repoUrl);
  if (!repoObj || !repoObj.user || !repoObj.repo) {
    throw new Error(`${packageName}: cannot parse repository url`);
  }
  const { user, repo } = repoObj;

  const readmePath = `${user}/${repo}/master/${readmeFilename}`;
  const githubUrl = GITHUB_README.replace("%s", readmePath);

  const readmeData = await fetch(githubUrl);
  return readmeData.toString();
}
