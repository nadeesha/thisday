'use strict';

var React = require('react');
var Sparkline = require('react-sparkline');
var moment = require('moment');
var Constants = require('../constants/Constants');

var SparklineWidget = React.createClass({

	render: function() {
		var values = [];
		var datesHashMap = this.props.data;

		for (var i = 13; i >= 0; i--) {
			var date = (moment().subtract(i, 'days').format(Constants.DATE_FORMAT));

			var points = datesHashMap[date] ? datesHashMap[date].value : 0;

			values.push(points);
		}



		return (
			<div className="t-widget big">
				<Sparkline
					data={values}
					width="440"
					height="120"
					strokeColor="white"
					strokeWidth="2px"
					circleDiameter="2"
					interpolate="none"
				/>
			</div>
		);
	}

});

module.exports = SparklineWidget;