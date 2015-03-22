'use strict';

var React = require('react');
var GoalsView = require('./GoalsView.react');
var Dashboard = require('./Dashboard.react');

var App = React.createClass({

    render: function() {
        return (
            <div className="row">
        		<GoalsView />
        		<Dashboard />
    		</div>
        );
    }

});

module.exports = App;