'use strict';

var Reflux = require('reflux');

var LogActions = Reflux.createActions([
	'createGoal',
	'updateGoal',
	'removeGoal',
	'clearCompleted'
]);

module.exports = LogActions;