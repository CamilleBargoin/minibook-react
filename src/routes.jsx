
var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var TodosApp = require("./components/TodosApp.jsx");
var Users = require('./components/Users.jsx');
var Landing = require('./components/Landing.jsx');
var App = require('./components/App.jsx');

var Home = require('./components/Home.jsx');
var UserProfile = require('./components/profile/UserProfile.jsx');


module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>
    <Route path="/users" component={Users}>
    </Route>
    <Route path="/todos" component={TodosApp}>
    </Route>
    <Route path="/home" component={Home}>
    </Route>
    <Route path="/profile" component={UserProfile}>
    </Route>
  </Route>
);
