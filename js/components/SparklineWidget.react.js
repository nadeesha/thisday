'use strict';

var React = require('react');
var Sparkline = require('react-sparkline');
var _ = require('lodash');
var moment = require('moment');

var SparklineWidget = React.createClass({

	render: function() {
		var values = [];
		var datesHashMap = _.indexBy(this.props.data, 'key');

		for (var i = 13; i >= 0; i--) {
			var date = (moment().subtract(i, 'days').format('MMM Do'));

			var points = datesHashMap[date] ? datesHashMap[date].value : 0;

			values.push(points);
		}



		return (
			<div className="t-widget big">
				<Sparkline
					data={values}
					width="500"
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