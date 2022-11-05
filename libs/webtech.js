const express = require("express");
const http = require("http");
const https = require("https");

module.exports = {
    newServer: function(port, callback, options = { cert: null, key: null }){
        var app = express();
        var canSSL = (
            options.cert == null || options.key == null ||
            options.cert == undefined || options.key == undefined
        )? false : true;
        var server = ((canSSL)? https : http).createServer(options, app);
        
        server.listen(port, callback);

        return app;
    },
    
}