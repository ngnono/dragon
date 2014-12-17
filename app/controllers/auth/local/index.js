"use strict";

var passport = require('passport');

module.exports = function (router) {
    router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
        var url = req.session.returnTo || '/home';
        res.redirect(url);
    });
};
