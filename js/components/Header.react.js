'use strict';

var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var Header = React.createClass({

	render: function() {
		return (
			<div id="header">
				<Navbar brand='thisday'>
					<Nav className="navbar-right">
						<NavItem eventKey={1} href='#'>Login</NavItem>
						<NavItem eventKey={1} href='#'>Logout</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}

});

module.exports = Header;