'use strict';

var _ = require('lodash');
var React = require('react');
var GoalEntry = require('./GoalEntry.react');
var GoalActions = require('../actions/GoalActions');

var GoalEntries = React.createClass({

    _onHideCompleted: function() {
        GoalActions.clearCompleted();
    },

    render: function() {
        var list = _.map(this.props.allGoals, function(goal) {
            return (<GoalEntry key={goal._id} goal={goal} edit={this.props.setCurrentlyEditing} />);
        }, this);

        if (list.length > 0) {
            return (
                <div>
                <div className="t-entries">
                    {list}
                </div>
                <div className="t-bottom-actions">
                    <button className="t-action" onClick={this._onHideCompleted}>
                        <i className="fa fa-eye-slash"></i> Hide Completed
                    </button>
                </div>
            </div>
            );
        } else {
            return (
                <div className="t-entry-notification">
                    <h3>You have not added any goals.<br/>Create one maybe?</h3>
                </div>
            );
        }
    }
});

module.exports = GoalEntries;
