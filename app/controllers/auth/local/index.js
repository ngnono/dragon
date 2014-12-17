"use strict";

var passport = require('passport');

module.exports = function (router) {
    router.post('/', passport.authenticate('local', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect(req.session.returnTo || '/home');
        });
};
