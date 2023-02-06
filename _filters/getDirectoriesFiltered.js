/**
 * Filter directories by name
 *
 * @param {string} path -  file path
 * @param {Array} filters - array of strings to  (if string supplied, turn into array)
 * @returns {Array} collection items from specified categories
 */
module.exports = function (path) {//, filters) {
    let results = new Set();
  
    // if (typeof filters === "string") {
    //     filters = Array.of(filters);
    // }

    const fs = require("fs");

    let directories = fs.readdirSync(path).filter(function(file) {
        return fs.statSync(path + "/" + file).isDirectory();
    });

    //filters.forEach((filter) => {
      let matches = directories.filter((item) =>
        item.includes(filter)
      );
      matches.forEach((item) => results.add(item));
    //});
  
    results = Array.from(results).sort((a, b) => a.localeCompare(b));
  
    return results;
};
