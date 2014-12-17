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

/**
 * Not Authenticated Middleware
 * @param config {Object|config}
 * @returns {Function}
 */
exports.notAuthenticated = function (config) {
    var auth = config.get('auth');
    return function (error, req, res, next) {
        var statusCode = res.statusCode || 500;
        if (statusCode === 401) {

            /**
             * redirect other website login by UserAgent
             */
            var userAgent = req.headers['user-agent'] || '';
            Object.keys(auth.auto || {}).forEach(function (device) {
                if (userAgent.indexOf(device) > 0) {
                    return res.redirect(302, auth.auto[device].redirect);
                }
            });

            /**
             * redirect default login
             */
            res.redirect(auth.redirect || '/login');
            return;
        }

        /**
         * return error to next middleware to process
         */
        next(error);
    };
};

exports.serverError = function (template) {
    return function (err, req, res, next) {
        var statusCode = res.statusCode || 500;

        console.log(err);
        var model = { url: req.url, err: err, statusCode: statusCode };
        if (req.xhr) {
            res.send(statusCode, model);
        } else {
            res.render(template, model);
        }

        next(err);
    };
};