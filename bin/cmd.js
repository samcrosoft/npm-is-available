#!/usr/bin/env node
"use strict";

var isAvailable = require('../src/index');
let minimist = require('minimist');
let fs = require("fs");
let argv = minimist(process.argv.slice(2), {
    alias: {h: 'help'},
    string: ['mode']
});
if (argv.help) {
    fs.createReadStream(__dirname + '/help.txt').pipe(process.stdout);
    return;
}

let oArgs = argv._.slice();

if (oArgs.length === 0) {
    console.error('Please Supply A Package Name');
    process.exit(0);
} else {
    (function runCheck() {
        let package_name = oArgs[0];
        isAvailable(`${package_name}`).then(isTaken => {
            let sMessage = isTaken ? "Package Name Is Taken!" : "Package Name Is Available";
            let iProcessReturnValue = isTaken ? 2 : 0;
            console.info(sMessage);
            process.exit(iProcessReturnValue);
        });

    })();

}



