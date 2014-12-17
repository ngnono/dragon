"use strict";

var passport = require('passport');

module.exports = function (router) {

    router.get('/', passport.authenticate('wechat'));

    router.get('/callback', passport.authenticate('wechat', {
        failureRedirect: '/auth/fail'
    }));
};
