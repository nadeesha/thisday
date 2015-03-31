'use strict';

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var UserActions = require('../actions/UserActions');


var Login = React.createClass({

	_onLogin: function () {
		UserActions.login({
			username: this.state.email,
			password: this.state.password
		});
	},

	_onEmailChange: function (e) {
		this.setState({
			email: e.target.value
		});
	},

	_onPasswordChange: function (e) {
		this.setState({
			password: e.target.value
		});
	},

	render: function() {
		return (
			<form className="form-horizontal row">
				<Input
					type="email"
					onChange={this._onEmailChange}
					label="E-mail" labelClassName=
					"col-md-2"
					wrapperClassName="col-md-3"
				/>
				<Input
					type="password"
					onChange={this._onPasswordChange}
					ref="password"
					label="Password"
					labelClassName="col-md-2"
					wrapperClassName="col-md-3"
				/>
				<Button
					className="col-md-offset-2"
					bsStyle="primary"
					onClick={this._onLogin}>
					Login
				</Button>
			</form>
		);
	}

});

module.exports = Login;