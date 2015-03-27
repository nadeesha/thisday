'use strict';

var _ = require('lodash');
var React = require('react');
var GoalEntry = require('./GoalEntry.react');

var GoalEntries = React.createClass({

    render: function() {
        var list = _.map(this.props.allGoals, function(goal) {
            return (<GoalEntry key={goal._id} goal={goal} edit={this.props.setCurrentlyEditing} />);
        }, this);

        return (
            <div className="t-entries">
               {list}
           </div>
        );
    }

});

module.exports = GoalEntries;