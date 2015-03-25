'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var GoalActions = {};

GoalActions.create = function (goal) {
	AppDispatcher.dispatch({
		actionType: Constants.GOAL_CREATE,
		created: goal
	});
};

GoalActions.update = function (id, goal) {
	AppDispatcher.dispatch({
		actionType: Constants.GOAL_UPDATE,
		id: id,
		updated: goal
	});
};

GoalActions.delete = function (id) {
	AppDispatcher.dispatch({
		actionType: Constants.GOAL_REMOVE
	});
};

module.exports = GoalActions;