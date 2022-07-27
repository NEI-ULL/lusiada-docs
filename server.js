const path = require("path");
const fs = require("fs");
const { getIP, getSettings } = require("./assets/tools.js");

let settings = getSettings();
let certificates = null;

// Loading HTTPS Certificates
if(
    settings.ssl.key != null && 
    settings.ssl.cert != null &&
    fs.existsSync(settings.ssl.key) &&
    fs.existsSync(settings.ssl.cert)
){
    certificates = {
        key: fs.readFileSync(settings.ssl.key),
        cert: fs.readFileSync(settings.ssl.cert)
    }
}

// Starting Servers
require("./database/dbserver.js")(settings.ports.dbserver, (err)=>{
    ips = getIP();
    console.log("Database Server:");
    if(!err){
        for(var name of Object.keys(ips)){
            ips[name].forEach((el)=>{
                console.log(`  > ${(certificates == null)? "http" : "https"}://${el}:${settings.ports.dbserver}/`);
            });
        }
        console.log();
    }
}, certificates);

require("./apiserver.js")(settings.ports.apiserver, (err)=>{
    ips = getIP();
    console.log("API Server:");
    if(!err){
        for(var name of Object.keys(ips)){
            ips[name].forEach((el)=>{
                console.log(`  > ${(certificates == null)? "http" : "https"}://${el}:${settings.ports.apiserver}/`);
            });
        }
        console.log();
    }
}, certificates);

require("./webpage/webserver.js")(settings.ports.webserver, (err)=>{
    ips = getIP();
    console.log("Webpage Server:");
    if(!err){
        for(var name of Object.keys(ips)){
            ips[name].forEach((el)=>{
                console.log(`  > ${(certificates == null)? "http" : "https"}://${el}:${settings.ports.webserver}/`);
            });
        }
        console.log();
    }
}, certificates);
