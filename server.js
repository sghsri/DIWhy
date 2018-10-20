const express = require('express');
const app = express();
var unirest = require('unirest');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


unirest.get("https://devru-instructables.p.mashape.com/json-api/getCategories")
    .header("X-Mashape-Key", "NchdEVDYyvmshQWZFToOl688Ib07p1tO5pPjsn0Rzzw9xT9IxG")
    .header("Accept", "application/json")
    .end(function (result) {
        var categories = result.body;
        console.log(categories);
    });
app.get('/', (req, res) => {
    res.send("hello world");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});