/**
 * Created by Adebola on 08/02/2016.
 */
"use strict";

let rq = require("request-promise");
let registryUrl = require('registry-url')();
var Promise = require('promise');

let operations = function (name) {
    if (!(typeof name === 'string' && name.length !== 0)) {
        return Promise.reject(new Error('Please Supply A Package Name'));
    }

    let sPackageUrl = `${registryUrl}${name.toLowerCase()}`;
    let options = {
        method: 'GET',
        uri: sPackageUrl
    };


    return rq(options).then(function () {
        return true;
    }).catch(function (err) {
        if (err.statusCode === 404) {
            return false;
        }

        throw err;
    });

};

module.exports = operations;