
var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

// var TodosApp = require("./components/TodosApp.jsx");
var Users = require('./components/Users.jsx');
var Landing = require('./components/Landing.jsx');
var App = require('./components/App.jsx');

var Home = require('./components/home/Home.jsx');
var UserProfile = require('./components/profile/UserProfile.jsx');
var Inbox = require('./components/inbox/Inbox.jsx');
var Admin = require('./components/admin/Admin.jsx');

var auth = require("./auth.js");


module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>
    <Route path="/users" component={Users}>
    </Route>
    {/*<Route path="/todos" component={TodosApp}>
    </Route>*/}
    <Route path="/home" component={Home} onEnter={requireAuth}>
    </Route>
    <Route path="/profile" component={UserProfile} onEnter={requireAuth}>
    </Route>
    <Route path="/inbox" component={Inbox} onEnter={requireAuth}>
    </Route>
    <Route path="/admin" component={Admin} onEnter={requireAuth}>
    </Route>
  </Route>
);



function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}