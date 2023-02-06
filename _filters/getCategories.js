/**
 * Filter collection by categories
 *
 * @param {Array} collection - collection (assuming front-matter have a 'categories' key)
 * @param {Array} categories - array of categories (if string supplied, turn into array)
 * @returns {Array} collection items from specified categories
 */
module.exports = function (collection, categories) {
    let results = new Set();
  
    if (typeof categories === "string") {
      categories = Array.of(categories);
    }
  
    categories.forEach((cat) => {
      let matches = collection.filter((item) =>
        item.data["categories"].includes(cat)
      );
      matches.forEach((item) => results.add(item));
    });
  
    results = Array.from(results).sort((a, b) => a.date - b.date);
  
    return results;
  };