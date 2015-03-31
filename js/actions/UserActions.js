'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var UserActions = {};

UserActions.create = function (user) {
	AppDispatcher.dispatch({
		actionType: Constants.USER_CREATE,
		created: user
	});
};

UserActions.login = function (credentials) {
	AppDispatcher.dispatch({
		actionType: Constants.USER_LOGIN,
		credentials: credentials
	});
};

UserActions.logout = function () {
	AppDispatcher.dispatch({
		actionType: Constants.USER_LOGOUT
	});
};

module.exports = UserActions;