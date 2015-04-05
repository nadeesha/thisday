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

    componentDidMount: function() {
        this._tick();
    },

    componentWillUnmount: function() {
        clearInterval(this._tickInterval);
    },

    _tick: function() {
        this._tickInterval = setInterval(function () {
            this.setState({
                sinceLast: this._updateTime()
            });
        }.bind(this), 60000);
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

        var sinceLastHours = moment().diff(lastDone.completedOn, 'hours');
        var sinceLastMinutes = moment().diff(lastDone.completedOn, 'minutes') - sinceLastHours * 60;
        var sinceLastTmpl = _.template('<%= hours %>:<%= minutes %>');
        var sinceLast = sinceLastTmpl({
            hours: _.padLeft(sinceLastHours, 2, '0'),
            minutes: _.padLeft(sinceLastMinutes, 2, '0')
        });

        return sinceLast;
    },

    render: function() {
        var sinceLast = this._updateTime();

        var doneGoals = _.filter(this.props.allGoals, function(goal) {
            return goal.done;
        });

        var lastDone = _.max(doneGoals, function(goal) {
            return moment(goal.completedOn).valueOf();
        });

        if (!lastDone) {
            clearInterval(this._tickInterval);
        }

        var sinceLastHours = moment().diff(lastDone.completedOn, 'hours');
        var sinceLastMinutes = moment().diff(lastDone.completedOn, 'minutes') - sinceLastHours * 60;
        var sinceLastTmpl = _.template('<%= hours %>:<%= minutes %>');
        sinceLast = sinceLastTmpl({
            hours: _.padLeft(sinceLastHours, 2, '0'),
            minutes: _.padLeft(sinceLastMinutes, 2, '0')
        });

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

        var undoneGoals = _.filter(this.props.allGoals, function(goal) {
            return !goal.done;
        });

        return (
            <div id="t-dashboard" className="col-md-6 t-widgets">
                <SparklineWidget data={datesHashMap} />
                <Widget name="Today" value={points.today} type={Constants.TYPE_INTEGER} />
                <Widget name="Yesterday" value={points.yesterday} type={Constants.TYPE_INTEGER} />
                <Widget name="Daily Change" value={dailyChange} type={Constants.TYPE_PERCENTAGE} />
                <Widget name="Weekly Change" value={weeklyChange} type={Constants.TYPE_PERCENTAGE} />
                <Widget name="Since Last" value={sinceLast} type={Constants.TYPE_STRING} />
                <Widget name="Unfinished" value={undoneGoals.length} type={Constants.TYPE_INTEGER} />
            </div>
        );
    }

});

module.exports = Dashboard;
