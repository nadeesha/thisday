'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var _ = require('lodash');
var PouchDB = require('pouchdb');
var console = window.console;

var _goals = [];
var _db = new PouchDB(Constants.DB_NAME);

function handleErr(err) {
    throw err;
}

function initiateSync(remoteDbUrl) {
    PouchDB.sync(Constants.DB_NAME, remoteDbUrl);
}

var GoalStore = _.assign({}, EventEmitter.prototype, {
    getAll: function(callback) {
        _db.query(function map(doc) {
            /* jshint ignore:start */

            // this is toString'd and then eval'd
            // so I have to hardcode type here

            if (doc.type === 'goal') {
                emit(doc);
            }

            /* jshint ignore:end */
        }, {
            include_docs: true
        }).then(function (result) {
            var docs = result.rows.map(function (row) {
                return row.doc;
            });

            docs = _.sortByAll(docs, ['createdOn']);

            callback(docs);
        }).catch(handleErr);
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

    _db.post(newGoal).then(GoalStore.emitChange.bind(GoalStore)).catch(handleErr);
}

function update(id, updatedGoal) {
    _db.get(id).then(function(existingGoal) {
        return _db.put(_.assign({}, existingGoal, updatedGoal));
    }).then(GoalStore.emitChange.bind(GoalStore)).catch(handleErr);
}

function remove(id) {
    _db.get(id).then(function(existingGoal) {
        return _db.remove(existingGoal);
    }).then(GoalStore.emitChange.bind(GoalStore)).catch(handleErr);
}

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case Constants.GOAL_CREATE:
            create(action.created);
            break;
        case Constants.GOAL_UPDATE:
            update(action.id, action.updated);
            break;
        case Constants.GOAL_REMOVE:
            remove(action.id);
            break;
        default:
            console.log('unhandled action', action);
    }
});

module.exports = GoalStore;
