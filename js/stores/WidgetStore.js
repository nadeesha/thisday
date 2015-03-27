'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var _ = require('lodash');
var PouchDB = require('pouchdb');
var GoalStore = require('./GoalStore');
var moment = require('moment');

var _db = new PouchDB(Constants.DB_NAME);

function handleErr(err) {
    throw err;
}

function getPointsByDate(callback) {
    function map(doc, emit) {
        if (doc.type === 'goal' && doc.done) {
            emit(moment(doc.completedOn).format('MMM Do'), Number(doc.points));
        }
    }

    _db.query({
        map: map,
        reduce: '_sum'
    }, {
        group: true
    }).then(function(result) {
        callback(result.rows);
    }).catch(handleErr);
}

var WidgetStore = _.assign({}, EventEmitter.prototype, {
    getPointsByDate: getPointsByDate,
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

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case Constants.GOAL_CREATE:
        case Constants.GOAL_UPDATE:
        case Constants.GOAL_REMOVE:
        case Constants.GOAL_MARK_AS_UNDONE:
        case Constants.GOAL_MARK_AS_DONE:
            AppDispatcher.waitFor([GoalStore.dispatchToken]);
            WidgetStore.emitChange(); // let's only emit change for now.
            break;
    }
});

module.exports = WidgetStore;
