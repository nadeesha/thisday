'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var _ = require('lodash');
var Couchback = window.Couchback;
var GoalActions = require('../actions/GoalActions');

var _isLoggedIn = false;

var UserStore = _.assign({}, EventEmitter.prototype, {
    isLoggedIn: function() {
        return _isLoggedIn;
    },
    emitChange: function() {
        this.emit(Constants.CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(Constants.CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(Constants.CHANGE_EVENT, callback);
    }
});

function getCachedUrl() {
    return localStorage.getItem('remoteUrl');
}

function setCachedUrl(url) {
    if (url) {
        localStorage.setItem('remoteUrl', url);
    } else {
        localStorage.removeItem('remoteUrl');
    }
}

function login(user) {
    Couchback.signIn(user.username, user.password, function(err, response) {
        if (!err) {
            setCachedUrl(response.authUrl);
            _isLoggedIn = true;
            UserStore.emitChange();
            GoalActions.initiateSync(response.authUrl);
        }
    });
}

function createUser(user) {
    Couchback.signUp(user.username, user.password, function(err) {
        if (!err) {
            login(user);
        }
    });
}

function logout() {
    setCachedUrl(null);
    _isLoggedIn = false;
    UserStore.emitChange();
}

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case Constants.USER_CREATE:
            createUser(action.created);
            break;
        case Constants.USER_LOGIN:
            login(action.credentials);
            break;
        case Constants.USER_LOGOUT:
            logout();
            break;
    }
});

// if a user had previously loggedin,
// let's try to resume syncing
if (getCachedUrl()) {
    _isLoggedIn = true;
    GoalActions.initiateSync(getCachedUrl());
}

module.exports = UserStore;
