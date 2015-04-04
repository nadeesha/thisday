'use strict';

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var UserActions = require('../actions/UserActions');
var Constants = require('../constants/Constants');

var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;

var Header = React.createClass({

	_onLogout: function () {
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
			if (this.props.syncStatus === Constants.SYNCING) {
				menuItems.push(<NavItem key="syncstatus">Syncing</NavItem>);
			}

			menuItems = [
				<NavItem onClick={this._onLogout} key="logout">Logout</NavItem>
			];

		}

		return (
			<div id="header">
				<Navbar brand='thisday'>
					<Nav className="navbar-right">
						{menuItems}
					</Nav>
				</Navbar>
			</div>
		);
	}

});

module.exports = Header;