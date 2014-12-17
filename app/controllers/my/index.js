"use strict";

"use strict";

var auth = require('../../../middleware/auth');

module.exports = function (router) {

    router.all('/*', auth.isAuthenticated());

    router.get('/', function (req, res) {

        var user = JSON.stringify(req.user);
        var query = req.query;
        res.render('my/index', {user: user || {}, params: query});
    });
};
