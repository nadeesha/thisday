'use strict';

var React = require('react');

var LogInput = React.createClass({

	render: function() {
		return (
			<input type="text" className="t-input" placeholder="I am going to achieve this +5" />
		);
	}

});

module.exports = LogInput;