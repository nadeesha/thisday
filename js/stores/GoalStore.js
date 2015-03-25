'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var _ = require('lodash');
var PouchDB = window.PouchDB;
var console = window.console;

var _goals = [];
var _db = new PouchDB(Constants.DB_NAME);

function handleErr(err) {
    console.error(err);
}

function initiateSync(remoteDbUrl) {
    PouchDB.sync(Constants.DB_NAME, remoteDbUrl);
}

var GoalStore = _.assign({}, EventEmitter.prototype, {
    getAll: function(callback) {
        _db.query({
            map: function(doc) {
                if (doc.type === Constants.TYPE_GOAL) {
                    this.emit(doc);
                }
            }
        }, {
            reduce: false
        }, callback);
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

function create(newGoal) {
    newGoal.type = Constants.TYPE_GOAL;
    newGoal.createdOn = new Date();

    _db.post(newGoal).then(GoalStore.emitChange).catch(handleErr);
}

function update(id, updatedGoal) {
    _db.get(id).then(function(existingGoal) {
        return _db.put(_.assign({}, existingGoal, updatedGoal));
    }).then(GoalStore.emitChange).catch(handleErr);
}

function remove(id) {
    _.get(id).then(function(existingGoal) {
        return _db.remove(existingGoal);
    }).then(GoalStore.emitChange).catch(handleErr);
}

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case Constants.GOAL_CREATE:
            create(action.goal);
            break;
        case Constants.GOAL_UPDATE:
            update(action.id, action.goal);
            break;
        case Constants.GOAL_REMOVE:
            remove(action.id);
            break;
        default:
            console.log('unhandled action', action);
    }
});
