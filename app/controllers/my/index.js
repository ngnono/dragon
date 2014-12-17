"use strict";

"use strict";

var auth = require('../../../middleware/auth');

module.exports = function (router) {

    router.all('/*', auth.isAuthenticated());

    router.get('/', function (req, res) {

        var user = req.user;
        console.log(user);
        res.render('my/index', {user: user || {}});
    });
};
