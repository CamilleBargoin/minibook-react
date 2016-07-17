
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



Array.prototype.propSort = function propSort(prop) {
  return this.sort(function(a, b) { return +a[prop] - +b[prop]; });
};

Array.prototype.propAsort = function propSort(prop) {
  return this.sort(function(a, b) { return +b[prop] - +a[prop]; });
};




$.cloudinary.config({ cloud_name: 'minibook', api_key: '778716888827849'});
