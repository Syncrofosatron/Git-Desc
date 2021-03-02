const cheerio = require('cheerio');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res)
{
  const url = req.body.githubLink;
  request(url, function(error, response, html)
  {
    const $ = cheerio.load(html);
    const body = $('.markdown-body');
    res.write("<h3>" + "Description" + "</h3>");
    res.write("<textArea cols=\"90\" rows = \"30\">" + body.text() + "</textArea>");
    res.send();
  })
})

app.listen(666, function()
{
  console.log("Started server...");
})
