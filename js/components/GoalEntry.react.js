'use strict';

var React = require('react');
var GoalActions = require('../actions/GoalActions');
var classNames = require('classnames');

var GoalEntry = React.createClass({

    _onEdit: function() {
        this.props.edit(this.props.goal);
    },

    _onRemove: function() {
        GoalActions.remove(this.props.goal._id);
    },

    _onMarkAsDone: function() {
        GoalActions.markAsDone(this.props.goal._id);
    },

    _onDateChange: function() {
        // body...
    },

    render: function() {
        var entryClasses = classNames({
            't-goal-entry': true,
            't-done': this.props.goal.done
        });

        return (
            <div className={entryClasses}>
				<span className="t-text">{this.props.goal.text}</span>
				<span className="t-text t-points">+{this.props.goal.points}</span>
                <span className="pull-right t-entry-actions">
                    <button
                        onClick={this._onMarkAsDone}>
                        <i className="t-action fa fa-check"></i>
                    </button>
                    <button
                        onClick={this._onEdit}>
                        <i className="t-action fa fa-pencil"></i>
                    </button>
                    <button
                        onClick={this._onRemove}>
                        <i className="t-action fa fa-trash-o"></i>
                    </button>
                    </span>
			</div>
        );
    }

});

module.exports = GoalEntry;

// this is a test for waka timw