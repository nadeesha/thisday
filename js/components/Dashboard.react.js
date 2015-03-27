'use strict';

var React = require('react');
var SparklineWidget = require('./SparklineWidget.react');
var Widget = require('./Widget.react');
var _ = require('lodash');
var moment = require('moment');
var Constants = require('../constants/Constants');

var Dashboard = React.createClass({

    getInitialState: function() {
        return {
            sinceLast: 0
        };
    },

    componentDidMount: function () {
        this._tick();
    },

    componentWillReceiveProps: function() {
        this._updateTime();
    },

    _tick: function() {
        this._tickInterval = setInterval(this._updateTime, 60000);
    },

    _updateTime: function() {
        var doneGoals = _.filter(this.props.allGoals, function(goal) {
            return goal.done;
        });

        var lastDone = _.max(doneGoals, function(goal) {
            return moment(goal.completedOn).valueOf();
        });

        if (!lastDone) {
            clearInterval(this._tickInterval);
        }

        this.setState({
            sinceLast: moment().diff(lastDone.completedOn, 'minutes')
        });
    },

    render: function() {
        var datesHashMap = _.indexBy(this.props.pointsByDate, 'key');

        var todaysDate = moment().format(Constants.DATE_FORMAT);
        var yesterdaysDate = moment().subtract(1, 'days').format(Constants.DATE_FORMAT);

        var points = {
            today: datesHashMap[todaysDate] ? datesHashMap[todaysDate].value : 0,
            yesterday: datesHashMap[yesterdaysDate] ? datesHashMap[yesterdaysDate].value : 0,
            thisweek: 0,
            lastweek: 0
        };

        var oneWeekAgo = moment().subtract(1, 'weeks');
        var twoWeekAgo = moment().subtract(2, 'weeks');

        _.forOwn(datesHashMap, function(datum, datekey) {
            var date = moment(datekey, Constants.DATE_FORMAT);

            if (date.isAfter(oneWeekAgo)) {
                points.thisweek += Number(datum.value);
            } else if (date.isAfter(twoWeekAgo)) {
                points.lastweek += Number(datum.value);
            }
        });

        var dailyChange = points.today / points.yesterday - 1;
        var weeklyChange = points.thisweek / points.lastweek - 1;

        return (
            <div className="col-md-6 t-widgets">
                <SparklineWidget data={datesHashMap} />
                <Widget name="Today" value={points.today} type={Constants.TYPE_INTEGER} />
                <Widget name="Yesterday" value={points.yesterday} type={Constants.TYPE_INTEGER} />
                <Widget name="Daily Change" value={dailyChange} type={Constants.TYPE_PERCENTAGE} />
                <Widget name="Weekly Change" value={weeklyChange} type={Constants.TYPE_PERCENTAGE} />
                <Widget name="Since Last" value={this.state.sinceLast} type={Constants.TYPE_STRING} />
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
