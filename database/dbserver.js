const fs = require("fs");
const path = require("path");
const express = require("express");
const http = require("http");
const https = require("https");

module.exports = (port, callback, certificates=null)=>{
    var app = express();

    // using ternary operator to create either an http or https server
    var server = ((certificates == null)?
        http.createServer(app) :              // Create an http server if certificates is null
        https.createServer(certificates, app) // Create an https server if has certificates
    );

    app.get("/", (req, res)=>{
        res.send("dbserver");
    });

    server.listen(port, ()=>{
        callback(false);
    });
};
