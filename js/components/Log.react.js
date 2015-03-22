'use strict';

var React = require('react');
var LogInput = require('./LogInput.react');
var LogEntries = require('./LogEntries.react');

var Log = React.createClass({

    render: function() {
        return (
            <div className="col-md-6">
                <LogInput />
                <LogEntries />
            </div>
        );
    }

});

module.exports = Log;