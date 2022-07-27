const fs = require("fs");
const path = require("path");
const express = require("express");
const http = require("http");
const https = require("https");
const { getSettings } = require("../assets/tools.js");

let settings = getSettings();
let apiAddress = null;

module.exports = (port, callback, certificates=null)=>{
    var app = express();

    // using ternary operator to create either an http or https server
    var protocol = (certificates == null)? http : https;
    var server = ((certificates == null)?
        http.createServer(app) :              // Create an http server if certificates is null
        https.createServer(certificates, app) // Create an https server if has certificates
    );
    apiAddress = `${(certificates == null)? "http" : "https"}://localhost:${settings.ports.apiserver}/`

    // Making the assets available under the /assets location
    app.use("/assets", express.static(path.join(__dirname, "www/assets/")));

    // Displaying Homepage
    app.get("/", (req, res)=>{
        res.sendFile(path.join(__dirname, "www/index.html"));
    });

    app.get("/wiki/*", (req, res)=>{
        var html = fs.readFileSync(path.join(__dirname, "www/wiki.html")).toString();
        var wiki_path = req.params[0].split("/"),
            wiki_article = "This page was not found!";
        
        protocol.request();
        
        html = html.replace(/(<article>)+(.|\n|\t|\r)+(<\/article>)/gim, '<article>'+wiki_article+'<article>');
        res.send(html);
    });

    server.listen(port, ()=>{
        callback(false);
    });
};
