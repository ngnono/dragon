"use strict";

module.exports = function (router) {

    router.get('/fail', function (req, res) {
        res.render('auth/fail');
    });
};
