'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Jumbotron = ReactBootstrap.Jumbotron;
var ReactRouterBootstrap = require('react-router-bootstrap');
var ButtonLink = ReactRouterBootstrap.ButtonLink;

var Home = React.createClass({

	render: function() {
		return (
			<Jumbotron>
				<h1>Let's make the most of this day!</h1>
				<p>Thisday helps you specify your daily goals and let you award yourself points for achieving them.</p>
				<p><ButtonLink to="mygoals" bsSize="large" bsStyle="success">Try it now!</ButtonLink></p>
			</Jumbotron>
		);
	}

});

module.exports = Home;