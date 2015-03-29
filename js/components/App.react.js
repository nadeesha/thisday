'use strict';

var React = require('react');
var Header =  require('./Header.react');
var MyGoals = require('./MyGoals.react');

var App = React.createClass({

    render: function() {
        return (
            <div id="container">
                <Header />
                <MyGoals />
            </div>
        );
    }

});

module.exports = App;
