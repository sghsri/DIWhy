const express = require('express');
const app = express();
var request = require('request');
const apiKEY = "NchdEVDYyvmshQWZFToOl688Ib07p1tO5pPjsn0Rzzw9xT9IxG";
const cheerio = require('cheerio');

var options = {
    url: 'https://www.reddit.com/r/funny.json',
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "X-Mashape-Key": apiKEY
    }
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/catg', (req, res) => {
    options.url = "https://devru-instructables.p.mashape.com/json-api/getCategories";
    request(options, function (err, response, body) {
        let json = JSON.parse(body);
        res.send(json);
    });
});
app.get('/search/keyword/:keyword', (req, res) => {
    var search = req.params.keyword;
    options.url = `https://www.instructables.com/howto/${search}/`;
    request(options, function (err, response, body) {
        var $ = cheerio.load(body);
        $('#search-results>li').each(function (i, elem) {
            console.log($(elem).find('span').first().text());
        });
    });
});

app.get('/search/catg/:catg', (req, res) => {
    var catg = req.params.catg;
    options.url = `https://www.instructables.com/${catg}`;
    request(options, function (err, response, body) {
        var $ = cheerio.load(body);
        var data = [];
        var promises = [];
        $('.cover-info').each(function (i, elem) {
            var title = $(elem).find('.title').text();
            var id = title.replace(/\s/g, '-');
            var link = `https://www.instructables.com${$(elem).find('.title>a').attr('href')}`;
            data.push({
                "title": title,
                "id": id,
                "link": link
            });
            promises.push(getIndividualData(id));
        });
        Promise.all(promises).then((values) => {
            res.send(values);
        }).catch(reason => {
            console.log(reason);
        });
    });
});


function getIndividualData(id) {
    return new Promise(function (resolve, reject) {
        options.url = `https://devru-instructables.p.mashape.com/json-api/showInstructable?id=${id}`;
        request(options, function (err, response, body) {
            var json = JSON.parse(body);
            resolve(json);
        });
    });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});