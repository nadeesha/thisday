'use strict';

var React = require('react');
var Header = require('./Header.react');
var MyGoals = require('./MyGoals.react');

var Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Route = Router.Route;

// var ReactBootstrap = require('react-bootstrap'),
//     Nav = ReactBootstrap.Nav;

// var ReactRouterBootstrap = require('react-router-bootstrap'),
//     NavItemLink = ReactRouterBootstrap.NavItemLink,
//     ButtonLink = ReactRouterBootstrap.ButtonLink;

var App = React.createClass({

    render: function() {
        return (
            <div id="container">
                <Header />
                <RouteHandler />
            </div>
        );
    }

});

var routes = (
    <Route handler={App} path="/">
        <Route name="mygoals" path="mygoals" handler={MyGoals} />
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.body);
});
