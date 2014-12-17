"use strict";

var express = require('express'),
    config = require('config'),
    bootstrap = require('./lib/bootstrap');

var app = express();

bootstrap.initialize(app, config);

var port = process.env.PORT || 18080;

app.listen(port, function () {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
    console.log('Application ready to serve requests.');
});
