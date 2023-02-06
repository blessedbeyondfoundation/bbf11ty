module.exports = function (path) {
    const fs = require("fs");
    let directories = fs.readdirSync(path).filter(function(file) {
        return fs.statSync(path + "/" + file).isDirectory();
    });
  
    return directories.sort((a, b) => a.localeCompare(b));
};
