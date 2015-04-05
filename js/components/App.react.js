'use strict';

var React = require('react');
var Header = require('./Header.react');
var MyGoals = require('./MyGoals.react');
var Login = require('./Login.react');
var Signup = require('./Signup.react');
var Home = require('./Home.react');
var UserStore = require('../stores/UserStore');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            isLoggedIn: false
        };
    },

    componentDidMount: function() {
        this._updateLoginStatus();
        UserStore.addChangeListener(this._onUserStoreChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onUserStoreChange);
    },

    _onUserStoreChange: function() {
        this._updateLoginStatus();
    },

    _updateLoginStatus: function() {
        this.setState({
            isLoggedIn: UserStore.isLoggedIn()
        });

        if (UserStore.isLoggedIn()) {
            this.context.router.transitionTo('mygoals');
        }
    },

    render: function() {
        return (
            <div id="container">
                <Header
                    isLoggedIn={this.state.isLoggedIn}
                />
                <div id="view" className="container">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

var routes = (
    <Route handler={App} path="/">
        <DefaultRoute name="home" handler={Home}/>
        <Route name="mygoals" path="mygoals" handler={MyGoals} />
        <Route name="login" path="login" handler={Login} />
        <Route name="signup" path="signup" handler={Signup} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});

// Pnotify settings
window.PNotify.prototype.options.styling = 'bootstrap3';
