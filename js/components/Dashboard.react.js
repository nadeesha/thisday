'use strict';

var React = require('react');

var Dashboard = React.createClass({

    render: function() {
        return (
            <div className="col-md-6 t-widgets">
                <div className="t-widget big"></div>
                <div className="t-widget">
                    <div>
                        <span>42</span>
                        <div className="stat">Today</div>
                    </div>
                </div>
                <div className="t-widget">
                    <div>
                        <span>+5%</span>
                        <div className="stat">Daily Change</div>
                    </div>
                </div>
                <div className="t-widget">
                    <div>
                        <span>+8%</span>
                        <div className="stat">Weekly Change</div>
                    </div>
                </div>
                <div className="t-widget">
                    <div>
                        <span>88:88</span>
                        <div className="stat">Since last</div>
                    </div>
                </div>
                <div className="t-widget">
                    <div>
                        <span>10</span>
                        <div className="stat">Unfinished</div>
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = Dashboard;
