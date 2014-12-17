"use strict";

var passport = require('passport'),
    WechatStrategy = require('passport-wechat').Strategy,
    LocalStrategy = require('passport-local').Strategy;

exports.initialize = function (app, config) {

    var wechatConfig = config.get('wechat');

    /**
     * wechat passport
     */
    passport.use(new WechatStrategy(wechatConfig, function (openid, profile, token, done) {

        //TODO:get userInfo from openid
        return done(null, {openid: openid, profile: profile});
    }));

    /**
     * local passport
     */
    passport.use(new LocalStrategy(function (username, password, done) {

            done(null, {name: "liangyali", roles: ['user']});
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    return app;
};