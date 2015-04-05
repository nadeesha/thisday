'use strict';

var React = require('react');
var GoalsView = require('./GoalsView.react');
var Dashboard = require('./Dashboard.react');
var GoalStore = require('../stores/GoalStore');
var WidgetStore = require('../stores/WidgetStore');
var UserStore = require('../stores/UserStore');
var tourGuideMixin = require('react-tour-guide').Mixin;

var ReactBoostrap = require('react-bootstrap');
var Alert = ReactBoostrap.Alert;

var tour = {
    startIndex: localStorage.getItem('tour-startIndex') || 0,
    scrollToSteps: true,
    steps: [{
        text: 'This is where you enter your goals. You can define a number of' +
            ' points to gain after you complete the goal',
        element: '#t-goal-input',
        position: 'left'
    }, {
        text: 'Example: Write new essay +7',
        element: '#t-goal-input',
        position: 'bottom'
    }, {
        text: 'Press <enter> to add your new goal.',
        element: '#t-goal-input',
        position: 'right'
    }, {
        text: 'When you complete your goals, you can see your points' +
            ' and other visualizations in the dashboard.',
        element: '#t-dashboard',
        position: 'top'
    }, {
        text: 'If you forgot to mark yesterday\'s goals, hover over today\'s ' +
            'date to change it.',
        element: '#t-goal-date',
        position: 'left'
    }, {
        text: 'Try adding specific, achievable goals, that you can finish ' +
            'within a few hours in a day. Break down large goals into small ' +
            'ones.',
        element: '#mygoals',
        position: 'center'
    }],
    completed: false
};

function tourCompleted() {
    localStorage.setItem('tour-startIndex', tour.steps.length);

    new window.PNotify({
        title: 'Thanks for taking the tour',
        text: 'Let\'s start adding some goals!',
        type: 'success'
    });
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
