'use strict';
require('ts-node/register');

var path         = require('path'),
    protractor   = require.resolve('protractor'),
    node_modules = protractor.substring(0, protractor.lastIndexOf('node_modules') + 12);

exports.config = {
    seleniumServerJar: path.resolve(node_modules, 'protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar'),

    framework: 'mocha',
    mochaOpts: {
        timeout: 10000
    },

    specs: [ 'staging/transpiled/spec/**/*.spec.js' ],

    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': path.resolve(node_modules, 'phantomjs-prebuilt/lib/phantom/bin/phantomjs'),
    },

    baseUrl: 'file://' + __dirname + '/spec/resources/',

    onPrepare: function () {

        // By default, Protractor uses data:text/html,<html></html> as resetUrl, but
        // location.replace from the data: to the file: protocol is not allowed
        // (we'll get ‘not allowed local resource’ error), so we replace resetUrl with one
        // that uses the file: protocol
        browser.resetUrl = 'file://';
        browser.ignoreSynchronization = true;
    }
};
