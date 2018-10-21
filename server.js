const express = require('express');
const app = express();
var request = require('request');
const apiKEY = "NchdEVDYyvmshQWZFToOl688Ib07p1tO5pPjsn0Rzzw9xT9IxG";
const cheerio = require('cheerio');
var bodyParser = require("body-parser");

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


app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
    .use(express.static(__dirname))
    .use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/find/", (req, res) => {
    res.sendFile(__dirname + "/find.html");
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
        console.log(options.url);
        request(options, function (err, response, body) {
            console.log(body);
            try {
                var json = JSON.parse(body);
                let materials = [];
                //parse from the steps
                json.materials = materials;
                resolve(json);
            } catch (err) {
                reject(err);
            }
        });
    });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});