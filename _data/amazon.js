const fetch = require("node-fetch");
const fs = require("fs");
const cheerio = require("cheerio");
const request = require('request');
module.exports = async function () {
  const url = 'https://www.amazon.com/s?i=stripbooks&rh=p_27%3ABlessed+Beyond+Foundation&s=review-count-rank&qid=1675694725&text=Blessed+Beyond+Foundation&ref=sr_st_review-count-rank&ds=v1%3Af3NR3vKuhKOapwA0%2BCiPnpgkm5O0dGNcopFxUZlwUGo';
  const books = [];
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    //console.log('************************************************************************');
   // console.log('parsing books');
    //console.log('************************************************************************');
    $('div.s-result-item').each((index, bookElement) => {
        //console.log(bookElement);
      const titleElement = $(bookElement).find('a.a-link-normal');
      //console.log('titleElement:'+titleElement);
      let title = titleElement.text();
      if (titleElement.length && !(title.includes('Visit the help section'))) {        
        let description = "";
        let subtitle = "";
        let series = "";
        if (title.includes("Book:")) {
          [title, subtitle] = title.split("Book:");
          if (subtitle.includes("(")) {
            const start = subtitle.indexOf("(");
            const end = subtitle.indexOf(")");
            series = subtitle.slice(start + 1, end);
            subtitle = subtitle.slice(0, start - 1);
          }
        }
        title = title + "Book";
        console.log('title:' + title);
        let link = titleElement.attr('href');
        if (!link.startsWith('http')) {
            link = `https://www.amazon.com${link}`;
        }
        const imageElement = $(bookElement).find('img.s-image');
        //const image = imageElement.length ? imageElement.attr('src') : '';
        const format = 'Paperback';
        const price = $(bookElement).find('span.a-offscreen').text();
        //console.log('price:' + price);

        const imageUrl = imageElement.length ? imageElement.attr('src') : '';
        const image = `./_assets/images/${title.replace(/\s+/g, '-').toLowerCase()}.png`;

        request(imageUrl).pipe(fs.createWriteStream(image)).on('close', () => {
          console.log(`Image saved: ${image}`);
        });

        books.push({ description, format, image, link, price, series, subtitle, tags: ["books", "coloring-books", "products"], title });
      }
    });
  } catch (error) {
    console.log(error);
  }
  return { books };
};