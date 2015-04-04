'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Jumbotron = ReactBootstrap.Jumbotron;
// var Button = ReactBootstrap.Button;
var ReactRouterBootstrap = require('react-router-bootstrap');
var ButtonLink = ReactRouterBootstrap.ButtonLink;

var Home = React.createClass({

	render: function() {
		return (
			<Jumbotron>
				<h1>Achieve your daily goals!</h1>
				<p>Thisday.io is a simple web app that lets you set daily goals and score points on achieving them.</p>
				<p><ButtonLink to="mygoals" bsSize="large" bsStyle="success">Try it now!</ButtonLink></p>
			</Jumbotron>
		);
	}

});

module.exports = Home;