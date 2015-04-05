'use strict';

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var UserActions = require('../actions/UserActions');

var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;

var Header = React.createClass({

	contextTypes: {
        router: React.PropTypes.func
    },

	_onLogout: function () {
		this.context.router.transitionTo('home');
		UserActions.logout();
	},

	render: function() {
		var menuItems = [];

		if (!this.props.isLoggedIn) {
			menuItems = [
				<NavItemLink to="login" key="login">Login</NavItemLink>,
				<NavItemLink to="signup" hey="signup">Signup</NavItemLink>
			];
		} else {
			menuItems = [
				<NavItem onClick={this._onLogout} key="logout">Logout</NavItem>
			];

		}

		return (
			<div id="header">
				<Navbar brand='Thisday'>
					<Nav className="navbar-right">
						{menuItems}
					</Nav>
				</Navbar>
			</div>
		);
	}

});

module.exports = Header;