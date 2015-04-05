'use strict';

var React = require('react');
var _ = require('lodash');
var Constants = require('../constants/Constants');
var GoalActions = require('../actions/GoalActions');

var GoalInput = React.createClass({

    getInitialState: function() {
        return {
            rawInput: ''
        };
    },

    componentWillReceiveProps: function(newProps) {
        var editing = newProps && newProps.toEdit;

        if (editing) {
            this.setState({
                rawInput: [editing.text, ' +', editing.points].join(''),
                points: editing.points,
                text: editing.text,
                id: editing._id
            });
        }
    },

    _onKeyDown: function(event) {
        if (event.keyCode === Constants.ENTER_KEY_CODE) {
            this._saveGoal();
        }
    },

    _saveGoal: function() {
        if (!this.state.points || !this.state.text) {
            new window.PNotify({
                text: 'Goal must be defined with +points',
                type: 'error'
            });

            return;
        }

        if (!this.props.toEdit) {
            GoalActions.create({
                points: this.state.points,
                text: this.state.text
            });
        } else {
            GoalActions.update(this.state.id, {
                points: this.state.points,
                text: this.state.text
            });
        }

        this.setState({
            points: null,
            text: null,
            rawInput: '',
            id: null
        });

        this.props.doneEditing();
    },

    _onChange: function(event) {
        var text = event.target.value;

        this.setState({
            rawInput: event.target.value
        });

        var tokens = text.split(' ');

        var pointsArray = _.filter(tokens, function(token) {
            return _.startsWith(token, '+');
        });

        if (pointsArray.length !== 1) {
            this.setState({
                error: 'Entry must contain points'
            });

            return;
        }

        var pointsText = pointsArray[0].slice(1, pointsArray[0].length);
        var points = _.parseInt(pointsText);

        if (_.isNaN(points)) {
            this.setState({
                error: 'Invalid amount of points entered after "+"'
            });

            return;
        }

        this.setState({
            points: points
        });

        var goalText = _.filter(tokens, function(token) {
            return !_.startsWith(token, '+');
        });

        goalText = goalText.join(' ');

        this.setState({
            text: goalText
        });
    },

    render: function() {
        return (
            <input
                id="t-goal-input"
                type="text"
                className="t-input"
                placeholder="I am going to achieve this +5"
                onKeyDown={this._onKeyDown}
                value={this.state.rawInput}
                onChange={this._onChange}
            />
        );
    }

});

module.exports = GoalInput;
