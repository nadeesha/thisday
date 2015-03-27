'use strict';

var React = require('react');
var GoalActions = require('../actions/GoalActions');
var classNames = require('classnames');
var Select = require('react-select');
var moment = require('moment');

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

        var dateOptions = [{
            value: moment().subtract(1, 'days'),
            label: moment().subtract(1, 'days').fromNow()
        }, {
            value: moment().subtract(2, 'days'),
            label: moment().subtract(2, 'days').fromNow()
        }];

        var dateSelector = <Select
                                className="t-date-selector"
                                value="one"
                                options={dateOptions}
                                onChange={this._onDateChange}
                            />;

        return (
            <div className={entryClasses}>
				<span className="t-text">{this.props.goal.text}</span>
				<span className="t-points">+{this.props.goal.points}</span>
				<button onClick={this._onMarkAsDone}><i className="fa fa-check"></i></button>
				<button onClick={this._onEdit}><i className="fa fa-pencil"></i></button>
				<button onClick={this._onRemove}><i className="fa fa-trash-o"></i></button>
			</div>
        );
    }

});

module.exports = GoalEntry;

// this is a test for waka timw