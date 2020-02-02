import getPackageReadme from 'get-package-readme';

export const getScreenWidth = () => process.stdout.columns;
export const getScreenHeight = () => process.stdout.rows;

export const getPackageDetails = (packageName) => new Promise((resolve, reject) => {
	getPackageReadme(packageName, (err, readme) => err ? reject(err) : resolve(readme));
});