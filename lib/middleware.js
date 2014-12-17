"use strict";

var bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    express = require('express'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    passport = require('./passport'),
    errHandlers = require('../middleware/errorHandlers'),
    enrouten = require('express-enrouten');

exports.initialize = function (app, config) {
    /**
     * static server
     */
    app.use(express.static(__dirname + '/public'));
    app.use(favicon('public/favicon.ico'));

    /**
     * view engine
     */
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    /**
     * app setting
     */
    app.disable('case sensitive routing');
    app.enable('view cache');
    app.disable('x-powered-by');

    /**
     * body parser
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(methodOverride());

    /**
     * session
     */
    app.use(session(config.get('session', {})));

    /**
     * passport init
     * [local,wechat]
     */
    passport.initialize(app, config);

    /**
     * routing
     */
    app.use(enrouten({
        directory: '../app/controllers',
        index: '../app/controllers/home'
    }));

    /**
     * error Handler
     */
    app.use(errHandlers.notAuthenticated(config));
    // app.use(errHandlers.serverError('error/50x'));
    app.use(errHandlers.fileNotFound('error/404'));

    return app;
};