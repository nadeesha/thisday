'use strict';

var React = require('react');
var GoalInput = require('./GoalInput.react');
var GoalEntries = require('./GoalEntries.react');

var GoalsView = React.createClass({

    render: function() {
        return (
            <div className="col-md-6">
                <GoalInput />
                <GoalEntries allGoals={this.props.allGoals} />
            </div>
        );
    }

});

module.exports = GoalsView;