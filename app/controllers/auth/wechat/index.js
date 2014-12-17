"use strict";

var passport = require('passport');

module.exports = function (router) {

    router.get('/', passport.authenticate('wechat'));

    router.get('/callback', passport.authenticate('wechat', {
        failureRedirect: '/auth/fail'
    }), function (req, res, next) {
        console.log(req.session.redirectTo);
        res.redirect(req.session.redirectTo);
    });
};
