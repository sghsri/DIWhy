const rp = require('request-promise');
const $ = require('cheerio');
var product_name = "wood glue"
var url = 'https://www.homedepot.com/s/' + product_name + '?NCNI-5';

rp(url)
  .then(function(html) {
    console.log(html);
  })
  .catch(function(err) {
    //handle error
});
