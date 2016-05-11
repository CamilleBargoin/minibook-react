
var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;

var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var routes = require('./routes.jsx');


var css = require("./main.css");


ReactDOM.render((
    <Router routes={routes} history={browserHistory} />
), document.getElementById('app'));
