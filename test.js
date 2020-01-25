var getPackageReadme = require('get-package-readme')

getPackageReadme('express', function (err, readme) {
  if (err) throw err
  console.log(readme
    .replace(/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/gms, "")
    .replace(/(\n)+/, "\n"))
})