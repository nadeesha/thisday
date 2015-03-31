'use strict';

var React = require('react');
var GoalsView = require('./GoalsView.react');
var Dashboard = require('./Dashboard.react');
var GoalStore = require('../stores/GoalStore');
var WidgetStore = require('../stores/WidgetStore');

var MyGoals = React.createClass({

    getInitialState: function() {
        return {
            allGoals: [],
            pointsByDate: []
        };
    },

    componentDidMount: function() {
        GoalStore.addChangeListener(this._onGoalStoreChange);
        WidgetStore.addChangeListener(this._onWidgetStoreChange);
        this._updateGoals();
        this._updateWidgets();
    },

    componentWillUnmount: function() {
        GoalStore.removeChangeListener(this._onGoalStoreChange);
        WidgetStore.removeChangeListener(this._onWidgetStoreChange);
    },

    _onGoalStoreChange: function() {
        this._updateGoals();
        this.setState({
            completionDate: GoalStore.getCompletionDate()
        });
    },

    _onWidgetStoreChange: function() {
        this._updateWidgets();
    },

    _updateGoals: function() {
        GoalStore.getAll(function(goals) {
            this.setState({
                allGoals: goals
            });
        }.bind(this));
    },

    _updateWidgets: function () {
        WidgetStore.getPointsByDate(function (points) {
            this.setState({
                pointsByDate: points
            });
        }.bind(this));
    },

    render: function() {
        return (
            <div className="row" id="mygoals">
                <GoalsView allGoals={this.state.allGoals} completionDate={this.state.completionDate} />
                <Dashboard allGoals={this.state.allGoals} pointsByDate={this.state.pointsByDate} />
            </div>
        );
    }

});

module.exports = MyGoals;
