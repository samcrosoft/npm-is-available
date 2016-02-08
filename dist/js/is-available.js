/**
 * npm-isavailable - A node package to check if the name of package is available or not
 * @version v1.0.0
 * @link https://github.com/samcrosoft/isavailable
 * @license MIT
 */
/**
 * Created by Adebola on 08/02/2016.
 */
"use strict";

var rq = require("request-promise");
var registryUrl = require('registry-url')();
var Promise = require('promise');

var operations = function operations(name) {
    if (!(typeof name === 'string' && name.length !== 0)) {
        return Promise.reject(new Error('Please Supply A Package Name'));
    }

    var sPackageUrl = "" + registryUrl + name.toLowerCase();
    var options = {
        method: 'GET',
        uri: sPackageUrl
    };

    return rq(options).then(function () {
        return true;
    })["catch"](function (err) {
        if (err.statusCode === 404) {
            return false;
        }

        throw err;
    });
};

module.exports = operations;