'use strict';

var React = require('react');
var GoalsView = require('./GoalsView.react');
var Dashboard = require('./Dashboard.react');
var GoalStore = require('../stores/GoalStore');
var WidgetStore = require('../stores/WidgetStore');
var UserStore = require('../stores/UserStore');
var tourGuideMixin = require('react-tour-guide').Mixin;
var STEPS = require('../constants/TourSteps');

var ReactBoostrap = require('react-bootstrap');
var Alert = ReactBoostrap.Alert;

var tour = {
    startIndex: localStorage.getItem('tour-startIndex') || 0,
    scrollToSteps: true,
    steps: STEPS,
    completed: false
};

function tourCompleted() {
    localStorage.setItem('tour-startIndex', tour.steps.length);
}

if (tour.steps.length.toString() === localStorage.getItem('tour-startIndex')) {
    tour.completed = true;
}

var MyGoals = React.createClass({

    mixins: [tour.completed ? null : tourGuideMixin(tour, tourCompleted)],

    getInitialState: function() {
        return {
            allGoals: [],
            pointsByDate: [],
            showAlert: true
        };
    },

    componentDidMount: function() {
        GoalStore.addChangeListener(this._onGoalStoreChange);
        WidgetStore.addChangeListener(this._onWidgetStoreChange);
        UserStore.addChangeListener(this._onUserStoreChange);
        this._updateGoals();
        this._updateWidgets();

        if (UserStore.isLoggedIn()) {
            this.setState({
                showAlert: false
            });
        }
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

    _updateWidgets: function() {
        WidgetStore.getPointsByDate(function(points) {
            this.setState({
                pointsByDate: points
            });
        }.bind(this));
    },

    _onUserStoreChange: function() {
        if (this.state.showAlert) {
            this.setState({
                showAlert: !UserStore.isLoggedIn()
            });
        }
    },

    _onAlertDismissal: function() {
        this.setState({
            showAlert: false
        });
    },

    render: function() {
        var alert = <span/>;

        if (this.state.showAlert) {
            alert = <div className="row">
                        <Alert bsStyle="info" onDismiss={this._onAlertDismissal}>
                            It seems that you are not logged in. If you want to save changes under your account, please log in.
                        </Alert>
                    </div>;
        }

        return (
            <div>
                {alert}
                <div className="row" id="mygoals">
                    <Dashboard className="col-md-6" allGoals={this.state.allGoals} pointsByDate={this.state.pointsByDate} />
                    <GoalsView className="col-md-6" allGoals={this.state.allGoals} completionDate={this.state.completionDate} />
                </div>
            </div>
        );
    }

});

module.exports = MyGoals;
