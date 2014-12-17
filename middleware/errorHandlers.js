"use strict";

var _ = require('lodash');

exports.fileNotFound = function (template) {
    return function (req, res, next) {
        var model = { url: req.url, statusCode: 404 };
        if (req.xhr) {
            res.send(404, model);
        } else {
            res.status(404);
            res.render(template, model);
        }
    };
};

exports.serverError = function (template, config) {
    return function (error, req, res, next) {
        var statusCode = res.statusCode || 500;

        console.log(error);
        var model = { url: req.url, err: error, statusCode: statusCode };
        if (req.xhr) {
            res.send(statusCode, model);
        } else if (error.name === 'AuthenticationError') {
            var auth = config.get('auth');
            /**
             * redirect other website login by UserAgent
             */
            var userAgent = req.headers['user-agent'] || '';
            Object.keys(auth.auto || {}).forEach(function (device) {
                if (userAgent.indexOf(device) > 0) {
                    return res.redirect(auth.auto[device].redirect);
                }
            });

            /**
             * redirect default login
             */
            res.location(auth.redirect || '/login');
        }
        else {
            res.render(template, model);
        }
    };
};