"use strict";

var useragent = require('useragent');
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
            var agent = useragent.parse(req.headers['user-agent'], '');
            Object.keys(auth.auto || {}).forEach(function (device) {
                console.log(agent.device.family);
                if (agent.device.family === device) {
                    return res.redirect(302, auth[device].redirect);
                }
            });

            /**
             * redirect default login
             */
            res.redirect(302, auth.redirect || '/login');
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

        var model = { url: req.url, err: err, statusCode: statusCode };
        if (req.xhr) {
            res.send(statusCode, model);
        } else {
            res.render(template, model);
        }
    };
};