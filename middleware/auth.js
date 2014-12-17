"use strict";

var util = require('util'),
    _ = require('lodash');


/**
 * AbstractError
 * @param options
 * @constructor
 */
function AbstractError(options) {
    this.name = 'AuthenticationError';
    this.message = options.message || 'error';

    var stackStartFunction = options.stackStartFunction;
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, stackStartFunction);
    } else {
        // try to throw an error now, and from the stack property
        // work out the line that called in to assert.js.
        try {
            this.stack = (new Error).stack.toString();
        } catch (e) {
        }
    }
};

util.inherits(AbstractError, Error);

/**
 * AuthenticationError Error
 * @param options
 * @constructor
 */
function AuthenticationError(options) {
    AuthenticationError.super_.call(this, options, this.constructor);
    this.name = 'AuthenticationError';
}

util.inherits(AuthenticationError, AbstractError);


/**
 * AuthorizedError Error
 * @param options
 * @constructor
 */
function AuthorizedError(options) {
    AuthorizedError.super_.call(this, options, this.constructor);
    this.name = 'AuthorizedError';
}

util.inherits(AuthorizedError, AbstractError);

/**
 * Exports Errors
 * @type {AbstractError}
 */
exports.AbstractError = AbstractError;
exports.AuthenticationError = AuthenticationError;
exports.AuthorizedError = AuthorizedError;

/**
 * user isAuthenticated routing middleware
 * @returns {Function}
 */
exports.isAuthenticated = function () {
    return function (req, res, next) {
        if (!req.isAuthenticated()) {

            if (res.session) {
                req.session.returnTo = req.url;
            }
            throw new AuthenticationError({
                message: 'Not Authentication'
            });
        }
        next();
    }
};

/**
 * User authorizations routing middleware
 */
exports.AuthorizedInRoles = function (roles) {
    var self = this;

    return function (req, res, next) {
        self.isAuthenticated()(req, res, function () {
            if (_.intersection(req.user.roles, roles).length) {
                return next();
            } else {
                throw new AuthorizedError({
                    message: 'Not AuthorizedInRoles'
                });
            }
        });
    };
};

/**
 * inject user into res.locals
 * @returns {injectUser}
 */
exports.injectUser = function () {
    return function injectUser(req, res, next) {
        if (req.isAuthenticated()) {
            res.locals.user = req.user;
        }
        next();
    };
};