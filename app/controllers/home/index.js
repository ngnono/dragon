"use strict";

var logger = require('pine')('home');

module.exports = function (router) {
    router.get('/', function (req, res) {

        logger.debug('info', 'test','test22222222222222222222133123123123123123123');
        res.render('home/index');
    });
};
