"use strict";

var middleware = require('./middleware');
var passport = require('./passport');
var pine = require('./pine');

exports.initialize = function (app, options) {

    middleware.initialize(app, options);
    passport.initialize(app, options);
    pine.initialize(app, options);

    return app;
};