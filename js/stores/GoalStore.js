'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var _ = require('lodash');
var PouchDB = require('pouchdb');
var UserActions = require('../actions/UserActions');

PouchDB.debug.disable();
var _db = new PouchDB(Constants.DB_NAME);
var _completionDate = null;
var _sync;
var _syncStatus = Constants.NOT_SYNCING;

function handleErr(err) {
    throw err;
}

var GoalStore = _.assign({}, EventEmitter.prototype, {
    getAll: function(callback) {
        var map;
        /* jshint ignore:start */
        map = function(doc) {
                // this is toString'd and then eval'd
                // so I have to hardcode type here

                if (doc.type === 'goal' && !doc.hidden) {
                    emit(doc);
                }
            }
            /* jshint ignore:end */

        _db.query(map, {
            include_docs: true
        }).then(function(result) {
            var docs = result.rows.map(function(row) {
                return row.doc;
            });

            docs = _.sortByOrder(docs, ['done', 'points', 'createdOn'], [true, false, false]);

            callback(docs);
        }).catch(handleErr);
    },
    getCompletionDate: function() {
        return _completionDate || new Date();
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
    newGoal.done = false;

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

function toggleDone(id) {
    _db.get(id).then(function(goal) {
        goal.done = !goal.done;

        if (goal.done) {
            goal.completedOn = GoalStore.getCompletionDate();
        } else {
            goal.completedOn = null;
        }

        return _db.put(goal);
    }).then(GoalStore.emitChange.bind(GoalStore)).catch(handleErr);
}

function changeCompletionDate(date) {
    _completionDate = date;
    GoalStore.emitChange();
}

function clearCompleted() {
    _db.query(function(doc, emit) {
        if (doc.done && !doc.hidden) {
            emit(doc);
        }
    }).then(function(result) {
        var docsToUpdate = _.clone(result.rows);

        docsToUpdate = _.map(docsToUpdate, function(row) {
            var doc = row.key;
            return _.assign(doc, {
                hidden: true
            });
        });

        return _db.bulkDocs(docsToUpdate);
    }).then(function() {
        GoalStore.emitChange();
    });
}

function initiateSync(url) {
    _sync = PouchDB.sync(Constants.DB_NAME, url, {
        live: true,
        retry: true
    }).on('denied', function() {
        UserActions.logout();
    }).on('paused', function() {
        _syncStatus = Constants.NOT_SYNCING;
    }).on('active', function () {
        if (_syncStatus === Constants.NOT_SYNCING) {
            new window.PNotify({
                text: 'Syncing',
                type: 'info'
            });
        }
        _syncStatus = Constants.SYNCING;
    }).on('complete', function () {
        _db.destroy().then(function () {
            _db = new PouchDB(Constants.DB_NAME);
        });
    });
}

function removeSync() {
    _sync.cancel();
}

GoalStore.dispatchToken = AppDispatcher.register(function(action) {
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
        case Constants.GOAL_MARK_AS_DONE:
        case Constants.GOAL_MARK_AS_UNDONE:
            toggleDone(action.id);
            break;
        case Constants.CHANGE_COMPLETION_DATE:
            changeCompletionDate(action.date);
            break;
        case Constants.GOAL_CLEAR_COMPLETED:
            clearCompleted();
            break;
        case Constants.USER_LOGOUT:
            removeSync();
            break;
        case Constants.INITIATE_SYNC:
            initiateSync(action.remoteUrl);
            break;
    }
});

module.exports = GoalStore;
