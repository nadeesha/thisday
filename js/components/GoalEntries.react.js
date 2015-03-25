'use strict';

var _ = require('lodash');
var React = require('react');

var GoalEntries = React.createClass({

    render: function() {
        var list = _.map(this.props.allGoals, function(goal) {
            return (<li>{goal.text} +{goal.points}</li>);
        });

        return (
            <ul className="t-list">
               {list}
           </ul>
        );
    }

});

module.exports = GoalEntries;
