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

GoalActions.remove = function (id) {
	AppDispatcher.dispatch({
		actionType: Constants.GOAL_REMOVE,
		id: id
	});
};

GoalActions.markAsDone = function (id) {
	AppDispatcher.dispatch({
		actionType: Constants.GOAL_MARK_AS_DONE,
		id: id
	});
};

GoalActions.changeCompletionDate = function (date) {
	AppDispatcher.dispatch({
		actionType: Constants.CHANGE_COMPLETION_DATE,
		date: date
	});
};

module.exports = GoalActions;