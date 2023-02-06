const fs = require("fs");

module.exports = fs.readdirSync("./").filter(function(file) {
  return fs.statSync(file).isDirectory();
});
