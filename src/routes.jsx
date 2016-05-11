
var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var TodosApp = require("./components/TodosApp.jsx");
var Users = require('./components/Users.jsx');
var Home = require('./components/Home.jsx');
var App = require('./components/App.jsx');


module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/users" component={Users}>
      
    </Route>
    <Route path="/todos" component={TodosApp}>
       
    </Route>
  </Route>
);
