'use strict';

var React = require('react');
var GoalInput = require('./GoalInput.react');
var GoalEntries = require('./GoalEntries.react');

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

    render: function() {
        return (
            <div className="col-md-6">
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