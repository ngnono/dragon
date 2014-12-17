"use strict";

var pine = require('pine');

exports.initialize = function (app, config) {
    pine.configure({
        basedir: __dirname,
        levels: undefined,
        colors: undefined,
        transports: {
            console: {
                level: 'debug'
            },
            file: {
                level: 'debug',
                filename: 'some.log'
            }
        },
        modules: {

        },
        exceptionHandlers: undefined
    });

    return app;
};
