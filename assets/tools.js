const path = require("path");
const fs = require("fs");
const { networkInterfaces } = require('os');

module.exports = {
    getIP:()=>{
        const nets = networkInterfaces();
        const results = Object.create(null); // or just '{}', an empty object

        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }

                    results[name].push(net.address);
                }
            }
        }

        return results;
    },
    getSettings:()=>{
        let settings = {
            ports: {
                webserver: 3000,
                dbserver: 3001,
                apiserver: 3002
            },
            ssl: {
                key: null,
                cert: null,
            }
        };
        
        // Loading Settings
        if(fs.existsSync(path.join(__dirname, "../package.json"))){
            var pkgJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json")));
            if(pkgJSON["settings"] != undefined){
                settings = pkgJSON["settings"];
            }
        }

        return settings;
    }
};