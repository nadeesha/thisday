'use strict';

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var Button = Bootstrap.Button;
var UserActions = require('../actions/UserActions');


var Signup = React.createClass({

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

	_onPasswordConfirmationChange: function (e) {
		this.setState({
			passwordConfirmation: e.target.value
		});
	},

	_signUp: function () {
		UserActions.create({
			username: this.state.email,
			password: this.state.password
		});
	},

	render: function() {
		return (
			<form className="form-horizontal row">
				<Input type="email"
					label="E-mail"
					onChange={this._onEmailChange}
					labelClassName="col-md-2"
					wrapperClassName="col-md-3"
				/>
				<Input
					type="password"
					label="Password"
					onChange={this._onPasswordChange}
					labelClassName="col-md-2"
					wrapperClassName="col-md-3"
				/>
				<Input
					type="password"
					label="Password Confirmation"
					onChange={this._onPasswordConfirmationChange}
					labelClassName="col-md-2"
					wrapperClassName="col-md-3"
				/>
				<Button
					className="col-md-offset-2"
					bsStyle="primary"
					onClick={this._signUp}>
					Signup
				</Button>
			</form>
		);
	}

});

module.exports = Signup;