eleventyConfig.addFilter("getChildDirectories", (path) => {
  let files = fs.readdirSync(__dirname + '/' + path);
  return files.filter(function(file) {
  return fs.statSync(path + "/" + file).isDirectory();
  });
});