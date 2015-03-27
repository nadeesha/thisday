'use strict';

var React = require('react');
var GoalInput = require('./GoalInput.react');
var GoalEntries = require('./GoalEntries.react');
var moment = require('moment');
var GoalActions = require('../actions/GoalActions');

var GoalsView = React.createClass({

	getInitialState: function () {
		return {
			toEdit: null
		};
	},

	_onStartEdit: function (goal) {
		this.setState({
			toEdit: goal
		});
	},

	_onConcludeEdit: function () {
		this.setState({
			toEdit: null
		});
	},

	_onDateChange: function () {
		GoalActions.changeCompletionDate(moment().subtract(1, 'days').toDate());
	},

	_onDateRest: function () {
		GoalActions.changeCompletionDate(moment().toDate());
	},

    render: function() {
    	var completionDateChanged = moment().format('DD') !== moment(this.props.completionDate).format('DD');
    	var dateTaunt;
    	var changeDateButton;

    	if (completionDateChanged) {
    		dateTaunt = <span>Editing goals as of {moment(this.props.completionDate).format('MMMM Do YYYY')}</span>;
    		changeDateButton = <button onClick={this._onDateRest}>reset to today</button>;
    	} else {
    		dateTaunt = <span>Today is {moment().format('MMMM Do YYYY')}</span>;
    		changeDateButton = <button className="t-show-on-hover" onClick={this._onDateChange}>change to yesterday</button>;
    	}

        return (
            <div className="col-md-6">
            	<div className="t-goal-date t-action-component">
            		{dateTaunt}
            		{changeDateButton}
            	</div>
                <GoalInput
                	toEdit={this.state.toEdit}
                	doneEditing={this._onConcludeEdit}
                />
                <GoalEntries
                	allGoals={this.props.allGoals}
                	setCurrentlyEditing={this._onStartEdit}
                />
            </div>
        );
    }

});

module.exports = GoalsView;