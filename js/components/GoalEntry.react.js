'use strict';

var React = require('react');
var GoalActions = require('../actions/GoalActions');

var GoalEntry = React.createClass({

	_onEdit: function () {
		this.props.edit(this.props.goal);
	},

	_onRemove: function () {
		GoalActions.remove(this.props.goal._id);
	},

    render: function() {
        return (
            <div className="t-goal-entry">
				<span className="t-text">{this.props.goal.text}</span>
				<span className="t-points">+{this.props.goal.points}</span>
				<button onClick={this._onEdit}><i className="fa fa-pencil"></i></button>
				<button onClick={this._onRemove}><i className="fa fa-trash-o"></i></button>
			</div>
        );
    }

});

module.exports = GoalEntry;