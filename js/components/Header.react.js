'use strict';

var React = require('react');

var Header = React.createClass({

	render: function() {
		return (
			<div id="header">
				<span className="brand">thisday</span>
			</div>
		);
	}

});

module.exports = Header;