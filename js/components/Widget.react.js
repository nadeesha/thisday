'use strict';

var React = require('react');
var numeral = require('numeral');
var Constants = require('../constants/Constants');
var _ = require('lodash');

var Widget = React.createClass({

    render: function() {
    	var formattedValue;

    	if (this.props.type === Constants.TYPE_PERCENTAGE) {
    		if (this.props.value === Infinity || _.isNaN(this.props.value)) {
    			formattedValue = '?';
    		} else {
    			formattedValue = numeral(this.props.value).format('0%');
    		}
    	} else {
    		formattedValue = this.props.value;
    	}

        return (
            <div className="t-widget">
                <div>
                    <div className="key">{this.props.name}</div>
                    <div className="value">{formattedValue}</div>
                </div>
            </div>
        );
    }

});

module.exports = Widget;
