'use strict';

var Constants = {
	DB_NAME: 'thisday',
	GOAL_CREATE: 'goal_create',
	GOAL_UPDATE: 'goal_update',
	GOAL_REMOVE: 'goal_remove',
	GOAL_MARK_AS_DONE: 'goal_mark_as_done',
	GOAL_MARK_AS_UNDONE: 'goal_mark_as_done',
	GOAL_CLEAR_COMPLETED: 'goal_clear_completed',
	CHANGE_EVENT: 'change',
	TYPE_GOAL: 'goal',
	ENTER_KEY_CODE: 13,
	CHANGE_COMPLETION_DATE: 'change_completion_date',
	DATE_FORMAT: 'MMM Do YYYY',
	TYPE_INTEGER: 'type_integer',
	TYPE_PERCENTAGE: 'type_percentage',
	TYPE_STRING: 'type_string',
	USER_CREATE: 'user_create',
	USER_LOGIN: 'user_login',
	USER_LOGOUT: 'user_logout',

	// localstorage keys
	AUTH_TOKEN: 'authToken',
	AUTH_TOKEN_EXPIRATION: 'expiredOn'
};

module.exports = Constants;