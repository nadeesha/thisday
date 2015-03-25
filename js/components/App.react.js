'use strict';

var React = require('react');
var GoalsView = require('./GoalsView.react');
var Dashboard = require('./Dashboard.react');
var GoalStore = require('../stores/GoalStore');

var App = React.createClass({

    componentDidMount: function() {
        GoalStore.addChangeListener(this._onChange);
        this._updateGoals();
    },

    componentWillUnmount: function() {
        GoalStore.removeChangeListener(this._onChange);
    },

    _updateGoals: function() {
        GoalStore.getAll(function(goals) {
            this.setState({
                allGoals: goals
            });
        });
    },

    _onChange: function() {
        this._updateGoals();
    },

    render: function() {
        return (
            <div className="row">
        		<GoalsView allGoals={this.state.allGoals} />
        		<Dashboard />
    		</div>
        );
    }

});

module.exports = App;
