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

        var model = { url: req.url, err: error, statusCode: 500 };
        if (req.xhr) {
            res.json(model);
        } else if (error.name === 'AuthenticationError') {
            /**
             * AuthenticationError redirect to login url
             */
            var auth = config.get('auth');
            var userAgent = req.headers['user-agent'] || '';
            var redirectURL = auth.redirect;

            Object.keys(auth.auto || {}).forEach(function (device) {
                if (userAgent.indexOf(device) > 0) {
                    redirectURL = auth.auto[device].redirect;
                }
            });

            /**
             * redirect default login
             */
            console.log(redirectURL);
            res.redirect(redirectURL || '/login');
        }
        else {
            res.render(template, model);
        }
    };
};