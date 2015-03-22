'use strict';

var React = require('react');
var Log = require('./Log.react');
var Dashboard = require('./Dashboard.react');

var App = React.createClass({

    render: function() {
        return (
            <div className="row">
        		<Log />
        		<Dashboard />
    		</div>
        );
    }

});

module.exports = App;