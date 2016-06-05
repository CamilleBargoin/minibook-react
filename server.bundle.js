/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var express = __webpack_require__(1);
	var path = __webpack_require__(2);

	// var compression = require('compression');

	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(4);
	var match = __webpack_require__(5).match;
	var RouterContext = __webpack_require__(5).RouterContext;
	var routes = __webpack_require__(6);

	//
	// SESSIONS
	//
	// var cookieParser = require('cookie-parser');
	// var session = require('express-session');
	// var sessionFileStore = require('session-file-store');
	// var ExpressSessionFileStore = sessionFileStore(session);

	// var fileStore = new ExpressSessionFileStore({
	//   ttl:3600,
	//   path:'./sessions'
	// });

	var app = express();
	// app.use(compression());

	// serve our static stuff like index.css
	//app.use(express.static(__dirname));
	//app.use(cookieParser());

	// app.use(session({
	//   secret: '1a9b829823448061ed5931380efc6c6a',
	//   resave: true,
	//   saveUninitialized: true,
	//   //store: fileStore,
	//   cookie: { maxAge: 60000 }
	// }));
	app.use(express.static(path.join(__dirname, 'public')));

	// send all requests to index.html so browserHistory in React Router works
	app.get('*', function (req, res) {

	  match({ routes: routes, location: req.url }, function (err, redirect, props) {

	    if (err) {
	      // there was an error somewhere during route matching
	      res.status(500).send(err.message);
	    } else if (redirect) {

	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {

	      var appHtml = ReactDOM.renderToString(React.createElement(RouterContext, props));
	      res.send(renderPage(appHtml));
	    } else {

	      // no errors, no redirect, we just didn't match anything
	      res.status(404).send('Not Found');
	    }
	  });
	});

	function renderPage(appHtml) {
	  return '<!doctype html public="storage">' + '<html>' + '<meta charset=utf-8/>' + '<meta http-equiv="x-ua-compatible" content="ie=edge">' + '<meta name="viewport" content="width=device-width, initial-scale=1">' + '<link rel="stylesheet" type="text/css" href="main.css">' + '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">' + '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' + '<title>My First React Router App</title>' + '<div id=app>${appHtml}</div>' + '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>' + '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>' + '<script src="/bundle.js"></script>';
	};

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});

	/* 
	    pour lancer l'app en mode production (pas de hot push code):
	      $ set NODE_ENV=production
	      $ npm start

	    pour lancer l'app en mode dev:
	      $ set NODE_ENV=development
	      $ npm start


	    pour afficher l'environnement:
	      $ echo %NODE_ENV%
	 */
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Route = __webpack_require__(5).Route;
	var IndexRoute = __webpack_require__(5).IndexRoute;

	// var TodosApp = require("./components/TodosApp.jsx");
	var Users = __webpack_require__(7);
	var Landing = __webpack_require__(9);
	var App = __webpack_require__(14);

	var Home = __webpack_require__(15);
	var UserProfile = __webpack_require__(23);
	var Inbox = __webpack_require__(34);
	var Admin = __webpack_require__(39);

	var auth = __webpack_require__(11);

	module.exports = React.createElement(
	  Route,
	  { path: '/', component: App },
	  React.createElement(IndexRoute, { component: Landing }),
	  React.createElement(Route, { path: '/users', component: Users }),
	  React.createElement(Route, { path: '/home', component: Home, onEnter: requireAuth }),
	  React.createElement(Route, { path: '/profile', component: UserProfile, onEnter: requireAuth }),
	  React.createElement(Route, { path: '/profile/:username', component: UserProfile, onEnter: requireAuth }),
	  React.createElement(Route, { path: '/inbox', component: Inbox, onEnter: requireAuth }),
	  React.createElement(Route, { path: '/admin', component: Admin, onEnter: requireAuth })
	);

	function requireAuth(nextState, replace) {
	  if (!auth.loggedIn()) {
	    replace({
	      pathname: '/',
	      state: { nextPathname: nextState.location.pathname }
	    });
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavLink = __webpack_require__(8);
	var Users = React.createClass({
	  displayName: 'Users',


	  getInitialState: function getInitialState() {
	    return {
	      test: 'foo'
	    };
	  },
	  contextTypes: {
	    router: React.PropTypes.object
	  },
	  render: function render() {

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        ' USERS !!'
	      )
	    );
	  }

	});

	module.exports = Users;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Link = __webpack_require__(5).Link;

	var NavLink = React.createClass({
	  displayName: 'NavLink',


	  render: function render() {
	    return React.createElement(Link, this.props);
	  }

	});

	module.exports = NavLink;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var LoginBox = __webpack_require__(10);
	var RegisterBox = __webpack_require__(13);

	var Landing = React.createClass({
	  displayName: 'Landing',
	  getInitialState: function getInitialState() {
	    return {
	      showLogin: true
	    };
	  },
	  showRegisterBox: function showRegisterBox() {
	    this.setState({
	      showLogin: false
	    });
	  },
	  showLoginBox: function showLoginBox() {
	    this.setState({
	      showLogin: true
	    });
	  },
	  render: function render() {

	    var box;
	    if (this.state.showLogin) {
	      box = React.createElement(
	        'div',
	        null,
	        React.createElement(LoginBox, null),
	        React.createElement(
	          'p',
	          null,
	          'Pas encore membre? ',
	          React.createElement(
	            'a',
	            { className: 'changeBox', onClick: this.showRegisterBox },
	            'inscris-toi !'
	          )
	        )
	      );
	    } else {
	      box = React.createElement(
	        'div',
	        null,
	        React.createElement(RegisterBox, null),
	        React.createElement(
	          'p',
	          null,
	          'J\'ai déjà un compte, ',
	          React.createElement(
	            'a',
	            { className: 'changeBox', onClick: this.showLoginBox },
	            'je me connecte !'
	          )
	        )
	      );
	    }

	    return React.createElement(
	      'div',
	      { id: 'homePage', className: 'container' },
	      React.createElement(
	        'div',
	        { className: 'row' },
	        React.createElement(
	          'h1',
	          { className: 'appTitle col s12' },
	          'minibook'
	        ),
	        box
	      )
	    );
	  }
	});

	module.exports = Landing;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Auth = __webpack_require__(11);
	var browserHistory = __webpack_require__(5).browserHistory;

	var LoginBox = React.createClass({
	  displayName: 'LoginBox',
	  getInitialState: function getInitialState() {
	    return {
	      email: "",
	      password: ""
	    };
	  },
	  updateField: function updateField(e) {
	    var obj = {};
	    obj[e.target.name] = e.target.value;
	    this.setState(obj);
	  },
	  login: function login() {
	    console.log("login action");

	    Auth.login(this.state.email, this.state.password, function () {
	      alert("YEAH");
	      console.log(window.document.cookie);
	    });

	    // browserHistory.push('/home');
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'row ' },
	      React.createElement(
	        'form',
	        { className: 'col s4 offset-s4 hoverable' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'email', name: 'email', type: 'text', className: 'validate', onChange: this.updateField }),
	            React.createElement(
	              'label',
	              { 'for': 'email' },
	              'e-mail'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'password', name: 'password', type: 'text', className: 'validate', onChange: this.updateField }),
	            React.createElement(
	              'label',
	              { 'for': 'password' },
	              'password'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'a',
	            { className: 'waves-effect waves-light btn col s12 green accent-4', onClick: this.login },
	            'Connexion'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = LoginBox;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var $ = __webpack_require__(12);

	var AuthService = {

	  loggedIn: function loggedIn() {

	    if (Storage) {
	      $.ajax({
	        method: "GET",
	        url: 'http://localhost:3000/users/secure',
	        data: { sessionId: localStorage.getItem("sessionId") },
	        success: function success(data, status) {

	          console.log(data);
	        },
	        error: function error(jqXHR, status, _error) {
	          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	        }

	      });
	    }
	  },

	  login: function login(email, password, callback) {

	    if (Storage) {
	      $.ajax({
	        type: 'POST',
	        url: 'http://localhost:3000/users/login',
	        // post payload:
	        data: JSON.stringify({ email: email, password: password }),
	        dataType: 'json',
	        contentType: "application/json",
	        success: function success(data, status, jqXHR) {

	          if (data.error) {
	            console.log(data.error);
	            Materialize.toast(data.error, 3000, 'toastError');
	          } else {

	            Materialize.toast("Loggé avec succès", 2000, 'toastSuccess', function () {

	              localStorage.setItem('sessionId', data.sessionId);
	              callback();
	            });
	          }
	        },
	        error: function error(jqXHR, status, _error2) {
	          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	        }

	      });
	    }
	  }
	};

	module.exports = AuthService;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("jquery");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var browserHistory = __webpack_require__(5).browserHistory;

	var RegisterBox = React.createClass({
	  displayName: 'RegisterBox',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  register: function register(e) {

	    e.preventDefault();

	    var newUser = {
	      firstName: this.refs.firstname.value,
	      lastName: this.refs.lastname.value,
	      email: this.refs.email.value,
	      password: this.refs.password.value
	    };

	    console.log(newUser);

	    $.ajax({
	      type: 'POST',
	      url: 'http://localhost:3000/users/register',
	      // post payload:
	      data: JSON.stringify(newUser),
	      dataType: 'json',
	      contentType: "application/json",
	      success: function success(data, status) {

	        if (data.error) {
	          console.log(data.error);
	          Materialize.toast(data.error, 3000, 'toastError');
	        } else {

	          Materialize.toast("Ton compte vient d'être créé!", 2000, 'toastSuccess', function () {
	            req.session.test = "ceciestuntest";
	            browserHistory.push('/home');
	          });
	        }
	      },
	      error: function error(jqXHR, status, _error) {
	        Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	      }

	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'row ' },
	      React.createElement(
	        'form',
	        { className: 'col s4 offset-s4 hoverable' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'input-field col s6' },
	            React.createElement('input', { id: 'first_name', type: 'text', className: 'validate', ref: 'firstname' }),
	            React.createElement(
	              'label',
	              { 'for': 'first_name' },
	              'prénom'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s6' },
	            React.createElement('input', { id: 'last_name', type: 'text', className: 'validate', ref: 'lastname' }),
	            React.createElement(
	              'label',
	              { 'for': 'last_name' },
	              'nom de famille'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'email', type: 'email', className: 'validate', ref: 'email' }),
	            React.createElement(
	              'label',
	              { 'for': 'email' },
	              'e-mail'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'password', type: 'password', className: 'validate', ref: 'password' }),
	            React.createElement(
	              'label',
	              { 'for': 'password' },
	              'password'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'password', type: 'password', className: 'validate', ref: 'password-conf' }),
	            React.createElement(
	              'label',
	              { 'for': 'password' },
	              'confirmation du password'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'a',
	            { className: 'waves-effect waves-light btn col s12 green accent-4', onClick: this.register },
	            'Inscription'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = RegisterBox;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavLink = __webpack_require__(8);
	var IndexLink = __webpack_require__(5).IndexLink;

	var App = React.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    return {
	      test: "test"
	    };
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { style: { height: "100%" } },
	      this.props.children
	    );
	  }
	});

	module.exports = App;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(16);
	var Footer = __webpack_require__(18);
	var FriendsGrid = __webpack_require__(19);

	var Chat = __webpack_require__(21);

	var Home = React.createClass({
	  displayName: 'Home',
	  getInitialState: function getInitialState() {
	    return {
	      chat: null
	    };
	  },
	  openChat: function openChat() {
	    this.setState({
	      chat: true
	    });
	  },
	  closeChat: function closeChat() {
	    this.setState({
	      chat: null
	    });
	  },
	  render: function render() {

	    var chat;

	    if (this.state.chat) chat = React.createElement(Chat, { name: 'Chuck Norris', closeChat: this.closeChat });else chat = React.createElement('div', null);

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(NavBar, { openChat: this.openChat, search: 'true' }),
	      React.createElement(FriendsGrid, null),
	      chat
	    );
	  }
	});

	module.exports = Home;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var UserSearch = __webpack_require__(17);

	var NavBar = React.createClass({
	  displayName: 'NavBar',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  searchUser: function searchUser(e) {
	    e.preventDefault();
	    alert(this.refs["userInput"].value);
	  },
	  render: function render() {

	    return React.createElement(
	      'div',
	      { className: 'navbar-fixed ' },
	      React.createElement(
	        'nav',
	        { className: 'green accent-4' },
	        React.createElement(
	          'div',
	          { className: 'nav-wrapper' },
	          React.createElement(
	            'a',
	            { href: '/home', className: 'brand-logo' },
	            'minibook'
	          ),
	          React.createElement(
	            'div',
	            { className: 'center' },
	            React.createElement(UserSearch, null),
	            React.createElement(
	              'ul',
	              { className: 'hide-on-med-and-down', style: { position: "absolute", top: 0, right: 0 } },
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { onClick: this.props.openChat, href: '#' },
	                  'test chat'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '/profile' },
	                  'Mon profil'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '/inbox' },
	                  React.createElement(
	                    'i',
	                    { className: 'material-icons' },
	                    'email'
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = NavBar;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var userList = [{
	  firstname: "albert",
	  lastname: "King",
	  color: "#47B8E0"
	}, {
	  firstname: "Bertrand",
	  lastname: "Forest",
	  color: "#FFC952"
	}, {
	  firstname: "Camille",
	  lastname: "Blue",
	  color: "#FF7473"
	}, {
	  firstname: "Donald",
	  lastname: "Smith",
	  color: "#47B8E0"
	}, {
	  firstname: "Etienne",
	  lastname: "Williamson",
	  color: "#FFC952"
	}, {
	  firstname: "Francois",
	  lastname: "Rivers",
	  color: "#FF7473"
	}, {
	  firstname: "Gertrude",
	  lastname: "Star",
	  color: "#47B8E0"
	}, {
	  firstname: "Henry",
	  lastname: "Bear",
	  color: "#FFC952"
	}, {
	  firstname: "Igor",
	  lastname: "Miller",
	  color: "#FF7473"
	}, {
	  firstname: "Janine",
	  lastname: "Paulson",
	  color: "#47B8E0"
	}, {
	  firstname: "Kamel",
	  lastname: "Frey",
	  color: "#FFC952"
	}, {
	  firstname: "Léonidas",
	  lastname: "Silver",
	  color: "#FF7473"
	}];

	var FindUser = React.createClass({
	  displayName: "FindUser",
	  getInitialState: function getInitialState() {
	    return {
	      suggestions: []
	    };
	  },
	  findUsers: function findUsers(string, callback) {
	    var stringLow = string.toLowerCase();
	    var result = [];
	    userList.map(function (user, key) {
	      if (user.firstname.toLowerCase().startsWith(stringLow) || user.lastname.toLowerCase().startsWith(stringLow)) result.push(user);
	    });

	    callback(result);
	  },
	  onChange: function onChange(e) {
	    var that = this;
	    var input = this.refs["userInput"].value;
	    if (input && input != "") {
	      this.findUsers(this.refs["userInput"].value, function (result) {
	        that.setState({
	          suggestions: result
	        });
	      });
	    } else {
	      that.setState({
	        suggestions: []
	      });
	    }
	  },
	  selectUser: function selectUser(e) {
	    console.log(e.currentTarget);
	  },
	  render: function render() {

	    var that = this;
	    var displayUserSuggestions = this.state.suggestions.length > 0 ? "block" : "none";
	    var userSuggestions = this.state.suggestions.map(function (user, key) {
	      return React.createElement(
	        "li",
	        { className: "collection-item", onClick: that.selectUser, key: key },
	        user.firstname,
	        " ",
	        user.lastname
	      );
	    });

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "form",
	        { className: "input-field col s12", onSubmit: this.searchUser },
	        React.createElement("input", { type: "text", className: "validate white-text green searchinput hoverable", placeholder: "rechercher un membre...", ref: "userInput", onChange: this.onChange })
	      ),
	      React.createElement(
	        "ul",
	        { className: "collection searchSuggestions", style: { display: displayUserSuggestions } },
	        userSuggestions
	      )
	    );
	  }
	});

	module.exports = FindUser;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Footer = React.createClass({
	  displayName: "Footer",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "footer",
	      { className: "page-footer green accent-4" },
	      React.createElement(
	        "div",
	        { className: "container" },
	        React.createElement(
	          "div",
	          { className: "row" },
	          React.createElement(
	            "div",
	            { className: "col l6 s12" },
	            React.createElement(
	              "h5",
	              { className: "white-text" },
	              "minibook"
	            ),
	            React.createElement(
	              "p",
	              { className: "white-text text-lighten-4" },
	              "Le mini réseau social entièrement développé avec React !"
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "col l4 offset-l2 s12" },
	            React.createElement(
	              "h5",
	              { className: "white-text" },
	              "Links"
	            ),
	            React.createElement(
	              "ul",
	              null,
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { className: "grey-text text-lighten-3", href: "#!" },
	                  "Link 1"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { className: "grey-text text-lighten-3", href: "#!" },
	                  "Link 2"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { className: "grey-text text-lighten-3", href: "#!" },
	                  "Link 3"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { className: "grey-text text-lighten-3", href: "#!" },
	                  "Link 4"
	                )
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "footer-copyright" },
	        React.createElement(
	          "div",
	          { className: "container" },
	          "© 2016 Copyright Camille Bargoin",
	          React.createElement(
	            "a",
	            { className: "white-text text-lighten-4 right", href: "#!" },
	            "More Links"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Footer;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var FriendBox = __webpack_require__(20);

	var FriendBoxContainer = React.createClass({
	  displayName: 'FriendBoxContainer',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  componentDidMount: function componentDidMount() {
	    $('.friendBox.tooltipped').tooltip({ delay: 50 });
	  },
	  render: function render() {

	    var friends = [{
	      name: "albert",
	      color: "#47B8E0"
	    }, {
	      name: "Bertrand",
	      color: "#FFC952"
	    }, {
	      name: "Camille",
	      color: "#FF7473"
	    }, {
	      name: "Donald",
	      color: "#47B8E0"
	    }, {
	      name: "Etienne",
	      color: "#FFC952"
	    }, {
	      name: "Francois",
	      color: "#FF7473"
	    }, {
	      name: "Gertrude",
	      color: "#47B8E0"
	    }, {
	      name: "Henry",
	      color: "#FFC952"
	    }, {
	      name: "Igor",
	      color: "#FF7473"
	    }, {
	      name: "Janine",
	      color: "#47B8E0"
	    }, {
	      name: "Kamel",
	      color: "#FFC952"
	    }, {
	      name: "Léonidas",
	      color: "#FF7473"
	    }, {
	      name: "Marine",
	      color: "#47B8E0"
	    }, {
	      name: "Noël",
	      color: "#FFC952"
	    }, {
	      name: "Ophélie",
	      color: "#FF7473"
	    }, {
	      name: "Patrick",
	      color: "#47B8E0"
	    }, {
	      name: "Quiburn",
	      color: "#FFC952"
	    }, {
	      name: "Rahan",
	      color: "#FF7473"
	    }, {
	      name: "Sylvain",
	      color: "#47B8E0"
	    }, {
	      name: "Théodore",
	      color: "#FFC952"
	    }, {
	      name: "Ursula",
	      color: "#FF7473"
	    }, {
	      name: "Voldemort",
	      color: "#47B8E0"
	    }, {
	      name: "Wanda",
	      color: "#FFC952"
	    }, {
	      name: "Xavier",
	      color: "#FF7473"
	    }, {
	      name: "Yvette",
	      color: "#47B8E0"
	    }, {
	      name: "Zoé",
	      color: "#FFC952"
	    }];

	    var friendBoxes = friends.map(function (friend, i) {
	      return React.createElement(FriendBox, { name: friend.name, key: i, color: friend.color });
	    });

	    var width = Math.floor($(document).width() / 164) * 164 + "px";

	    return React.createElement(
	      'div',
	      { style: { textAlign: "center" } },
	      React.createElement(
	        'div',
	        { style: { display: "flex", flexWrap: "wrap", width: width, margin: "0 auto" } },
	        friendBoxes,
	        friendBoxes,
	        friendBoxes
	      )
	    );
	  }
	});

	module.exports = FriendBoxContainer;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var browserHistory = __webpack_require__(5).browserHistory;

	var FriendBox = React.createClass({
	  displayName: 'FriendBox',
	  componentDidMount: function componentDidMount() {},
	  openFriendProfile: function openFriendProfile() {

	    browserHistory.push('/profile/' + this.props.name);
	  },
	  render: function render() {
	    var tooltip = "Dernier Statut de " + this.props.name;

	    return React.createElement(
	      'div',
	      { onClick: this.openFriendProfile, className: 'friendBox hoverable tooltipped', 'data-position': 'bottom', 'data-delay': '50', 'data-tooltip': tooltip, style: { backgroundColor: this.props.color } },
	      React.createElement(
	        'p',
	        null,
	        this.props.name
	      )
	    );
	  }
	});

	module.exports = FriendBox;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Messages = __webpack_require__(22);

	var Chat = React.createClass({
	    displayName: 'Chat',
	    getInitialState: function getInitialState() {
	        return {
	            messages: []
	        };
	    },
	    onClose: function onClose() {
	        this.props.closeChat(this.props.name);
	    },
	    submitMessage: function submitMessage(e) {
	        e.preventDefault();
	        var messages = this.state.messages;
	        messages.push({ author: "me", text: this.refs.messageInput.value });
	        this.setState({ messages: messages });
	        this.refs.messageInput.value = "";
	    },
	    componentDidMount: function componentDidMount() {

	        var self = this;
	        setTimeout(function () {
	            var messages = self.state.messages;
	            messages.push({ author: "Chuck", text: "HAHAHAHA" });
	            self.setState({ messages: messages });
	        }, 5000);
	    },
	    render: function render() {

	        var messages = this.state.messages;

	        return React.createElement(
	            'div',
	            { style: { width: "250px", height: "360px", position: "fixed", bottom: 0, right: "20px", margin: 0, padding: 0 }, className: 'grey lighten-5 hoverable' },
	            React.createElement(
	                'div',
	                { className: 'green', style: { width: "100%", height: "35px", margin: 0 } },
	                React.createElement(
	                    'div',
	                    { className: 'white-text left', style: { width: "80%", height: "35px", lineHeight: "35px", paddingLeft: "10px" } },
	                    this.props.name
	                ),
	                React.createElement(
	                    'div',
	                    { onClick: this.onClose, className: 'waves-effect waves-light btn right green', style: { width: "34px", height: "34px", padding: 0 } },
	                    React.createElement(
	                        'i',
	                        { className: 'material-icons small white-text' },
	                        'close'
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { style: { width: "250px", height: "320px", margin: "0 auto", padding: 0 } },
	                React.createElement(
	                    'div',
	                    { id: 'chatBody', style: { display: "block", width: "100%", height: "260px", margin: 0, padding: 0 } },
	                    React.createElement(Messages, { messages: this.state.messages })
	                ),
	                React.createElement(
	                    'div',
	                    { style: { display: "block", width: "100%", height: "40px" } },
	                    React.createElement(
	                        'form',
	                        { onSubmit: this.submitMessage },
	                        React.createElement(
	                            'div',
	                            { className: 'input-field', style: { borderTop: "2px solid #202020" } },
	                            React.createElement('input', { type: 'text', placeholder: 'Ton message...', ref: 'messageInput', style: { paddingLeft: "10px" } })
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Chat;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Messages = React.createClass({
	    displayName: "Messages",
	    render: function render() {

	        var texts = this.props.messages.map(function (message, i) {

	            if (message.author == "me") {
	                return React.createElement(
	                    "p",
	                    null,
	                    message.text
	                );
	            }
	            return;
	            React.createElement(
	                "p",
	                { style: { textAlign: "right", width: "100%" } },
	                message.text
	            );
	        });

	        return React.createElement(
	            "div",
	            null,
	            texts
	        );
	    }
	});

	module.exports = Messages;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(16);
	var Footer = __webpack_require__(18);
	var PostNewFeed = __webpack_require__(24);
	var Wall = __webpack_require__(25);
	var FriendsList = __webpack_require__(29);
	var ProfileData = __webpack_require__(31);

	var ToolBar = __webpack_require__(33);

	var UserProfile = React.createClass({
	  displayName: 'UserProfile',
	  getInitialState: function getInitialState() {

	    return {
	      display: 0,
	      user: this.findUserById(this.props.params.username)
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    $('.profile_parallax').parallax();
	  },
	  findUserById: function findUserById(id) {

	    return {
	      profile: {
	        firstname: "Camille",
	        lastname: "Bargoin",
	        age: 30,
	        email: "camille@minibook.com",
	        address: "87 rue Saint Fargeau",
	        city: "Paris"
	      },
	      posts: [{
	        id: 1,
	        body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
	        comments: [{
	          author: "John Rambo",
	          body: "Yeah ca claque!"
	        }, {
	          author: "Miley Cirus",
	          body: "Lolilol"
	        }, {
	          author: "Cmd Cousteau",
	          body: "..."
	        }]
	      }, {
	        id: 2,
	        body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
	        comments: [{
	          author: "John Rambo",
	          body: "Yeah ca claque!"
	        }, {
	          author: "Miley Cirus",
	          body: "Lolilol"
	        }, {
	          author: "Cmd Cousteau",
	          body: "..."
	        }]
	      }, {
	        id: 3,
	        body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
	        comments: [{
	          author: "John Rambo",
	          body: "Yeah ca claque!"
	        }, {
	          author: "Miley Cirus",
	          body: "Lolilol"
	        }, {
	          author: "Cmd Cousteau",
	          body: "..."
	        }]
	      }]
	    };
	  },
	  selectContent: function selectContent(index) {
	    this.setState({
	      display: index
	    });
	  },
	  postFeed: function postFeed(post) {

	    var user = this.state.user;
	    user.posts.unshift({
	      id: Math.random() * 10000000,
	      body: post,
	      comments: []
	    });

	    this.setState({
	      user: user
	    });

	    // CALL API SERVER & SAVE IN DATABASE
	  },
	  postComment: function postComment(comment, postId) {

	    console.log(comment);
	    console.log(postId);

	    var user = this.state.user;

	    for (var i = 0; i < user.posts.length; i++) {
	      if (user.posts[i].id == postId) {
	        user.posts[i].comments.push({
	          author: this.state.user.profile.firstname + " " + this.state.user.profile.lastname,
	          body: comment
	        });

	        this.setState({
	          user: user
	        });

	        // CALL API SERVER & SAVE IN DATABASE
	        break;
	      }
	    }
	  },
	  updateProfile: function updateProfile(field) {

	    var user = this.state.user;
	    user.profile[field.label] = field.value;

	    this.setState({
	      user: user
	    });

	    // CALL API SERVER & SAVE IN DATABASE
	  },
	  render: function render() {

	    var displayContent;

	    if (this.state.display === 0) displayContent = React.createElement(Wall, { posts: this.state.user.posts, postComment: this.postComment });else if (this.state.display == 1) displayContent = React.createElement(FriendsList, null);else if (this.state.display == 2) displayContent = React.createElement(ProfileData, { profile: this.state.user.profile, updateProfile: this.updateProfile });

	    return React.createElement(
	      'div',
	      { id: 'userProfile' },
	      React.createElement(NavBar, null),
	      React.createElement(
	        'div',
	        { className: 'parallax-container' },
	        React.createElement(
	          'div',
	          { className: 'profile_parallax' },
	          React.createElement('img', { src: '/images/user-background1.jpg' })
	        ),
	        React.createElement(
	          'div',
	          { id: 'profilePicture', className: 'hoverable' },
	          React.createElement(
	            'i',
	            { className: 'large material-icons' },
	            'add'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(ToolBar, { selectContent: this.selectContent }),
	          React.createElement(PostNewFeed, { post: this.postFeed })
	        )
	      ),
	      displayContent,
	      React.createElement('div', { style: { height: "350px" } })
	    );
	  }
	});

	module.exports = UserProfile;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var PostNewFeed = React.createClass({
	  displayName: "PostNewFeed",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  submitNewFeed: function submitNewFeed(e) {
	    e.preventDefault();
	    this.props.post(this.refs.feedInput.value);

	    this.refs.feedInput.value = "";
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "row postNewFeedBox" },
	      React.createElement(
	        "div",
	        { className: "card-panel hoverable col s8 offset-s2 m6 offset-m3" },
	        React.createElement(
	          "form",
	          { className: "input-field col s12", onSubmit: this.submitNewFeed },
	          React.createElement("input", { id: "newFeed", type: "text", className: "validate", ref: "feedInput" }),
	          React.createElement(
	            "label",
	            { "for": "newFeed" },
	            "Exprime-toi !"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = PostNewFeed;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var WallFeed = __webpack_require__(26);

	var Wall = React.createClass({
	  displayName: "Wall",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var self = this;
	    var wallPosts = this.props.posts.map(function (post, i) {
	      return React.createElement(WallFeed, { post: post, key: i, postComment: self.props.postComment });
	    });

	    return React.createElement(
	      "div",
	      { className: "container" },
	      wallPosts
	    );
	  }
	});

	module.exports = Wall;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var FeedCommentBox = __webpack_require__(27);

	var WallFeed = React.createClass({
	  displayName: 'WallFeed',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  postComment: function postComment(e) {
	    e.preventDefault();

	    this.props.postComment(this.refs.commentInput.value, this.props.post.id);
	  },
	  render: function render() {

	    var commentsContainer;

	    if (this.props.post.comments) {
	      commentsContainer = React.createElement(FeedCommentBox, { comments: this.props.post.comments });
	    } else {
	      commentsContainer = React.createElement('div', null);
	    }

	    return React.createElement(
	      'div',
	      { style: { margin: "50px 0" }, className: 'wallFeed row' },
	      React.createElement(
	        'div',
	        { className: 'col l1 offset-l2 m1 offset-m1 s1' },
	        React.createElement('div', { style: { height: "60px", width: "60px", marginTop: "7px" }, className: 'blue tooltipped hoverable', 'data-position': 'left', 'data-delay': '50', 'data-tooltip': 'Camille Bargoin' })
	      ),
	      React.createElement(
	        'div',
	        { className: 'grey lighten-5 card-panel hoverable col l6 m8 offset-m1 s10 offset-s1' },
	        React.createElement(
	          'p',
	          { className: 'feedText' },
	          this.props.post.body
	        ),
	        commentsContainer
	      ),
	      React.createElement(
	        'form',
	        { className: 'input-field col l6 offset-l3 m8 offset-m3 s10 offset-s2', onSubmit: this.postComment },
	        React.createElement('input', { id: 'feedAComment', type: 'text', className: 'validate', ref: 'commentInput' }),
	        React.createElement(
	          'label',
	          { 'for': 'feedAComment' },
	          'Un commentaire ?'
	        )
	      )
	    );
	  }
	});

	module.exports = WallFeed;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Comment = __webpack_require__(28);

	var FeedCommentBox = React.createClass({
	  displayName: 'FeedCommentBox',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var comments = this.props.comments.map(function (comment, i) {
	      return React.createElement(Comment, { body: comment.body, author: comment.author, key: i });
	    });

	    return React.createElement(
	      'div',
	      null,
	      comments
	    );
	  }
	});

	module.exports = FeedCommentBox;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Comment = React.createClass({
	  displayName: "Comment",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { style: { marginTop: "20px" }, className: "card hoverable" },
	      React.createElement(
	        "p",
	        { style: { margin: 0, padding: "5px 20px 0" } },
	        "\"",
	        this.props.body,
	        "\""
	      ),
	      React.createElement(
	        "p",
	        { style: { fontWeight: "bold", margin: "0 20px 0 0", padding: "0 0 5px 0", textAlign: "right" } },
	        this.props.author
	      )
	    );
	  }
	});

	module.exports = Comment;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var FriendsListItem = __webpack_require__(30);

	var FriendsList = React.createClass({
	  displayName: 'FriendsList',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { id: 'friendsList', className: 'container' },
	      React.createElement(
	        'ul',
	        { className: 'collection hoverable' },
	        React.createElement(FriendsListItem, { name: 'Chuck Norris' }),
	        React.createElement(FriendsListItem, { name: 'Jean-CLaude VanDamme' }),
	        React.createElement(FriendsListItem, { name: 'Steven Seagal' }),
	        React.createElement(FriendsListItem, { name: 'Kurt Russel' })
	      )
	    );
	  }
	});

	module.exports = FriendsList;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var FriendsListItem = React.createClass({
	  displayName: "FriendsListItem",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "li",
	      { className: "collection-item avatar" },
	      React.createElement("img", { src: "http://lorempixel.com/42/42/people", alt: "", className: "circle" }),
	      React.createElement(
	        "span",
	        { className: "title" },
	        this.props.name
	      ),
	      React.createElement(
	        "p",
	        null,
	        "First Line ",
	        React.createElement("br", null),
	        "Second Line"
	      ),
	      React.createElement(
	        "a",
	        { href: "#!", className: "secondary-content" },
	        React.createElement(
	          "i",
	          { className: "material-icons" },
	          "send"
	        )
	      )
	    );
	  }
	});

	module.exports = FriendsListItem;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var ProfileDataField = __webpack_require__(32);

	var ProfileData = React.createClass({
	  displayName: 'ProfileData',
	  getInitialState: function getInitialState() {
	    return {
	      edit: false
	    };
	  },
	  render: function render() {

	    return React.createElement(
	      'div',
	      { id: 'profileData', className: 'container' },
	      React.createElement(
	        'ul',
	        { className: 'collection hoverable' },
	        React.createElement(ProfileDataField, { label: 'Prénom', fieldLabel: 'firstname', value: this.props.profile.firstname, index: '0', updateProfile: this.props.updateProfile }),
	        React.createElement(ProfileDataField, { label: 'Nom', fieldLabel: 'lastname', value: this.props.profile.lastname, index: '1', updateProfile: this.props.updateProfile }),
	        React.createElement(ProfileDataField, { label: 'Âge', fieldLabel: 'age', value: this.props.profile.age + " ans", index: '2', updateProfile: this.props.updateProfile }),
	        React.createElement(ProfileDataField, { label: 'E-mail', fieldLabel: 'email', value: this.props.profile.email, index: '3', updateProfile: this.props.updateProfile }),
	        React.createElement(ProfileDataField, { label: 'Adresse', fieldLabel: 'address', value: this.props.profile.address, index: '4', updateProfile: this.props.updateProfile }),
	        React.createElement(ProfileDataField, { label: 'Ville', fieldLabel: 'city', value: this.props.profile.city, index: '5', updateProfile: this.props.updateProfile })
	      )
	    );
	  }
	});

	module.exports = ProfileData;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var ProfileDataField = React.createClass({
	  displayName: "ProfileDataField",
	  getInitialState: function getInitialState() {
	    return {
	      edit: false
	    };
	  },
	  edit: function edit() {
	    this.setState({
	      edit: true
	    });
	  },
	  save: function save(e) {
	    e.preventDefault();

	    this.props.updateProfile({
	      label: this.props.fieldLabel,
	      value: this.refs.input.value
	    });

	    this.setState({
	      edit: false
	    });
	  },
	  render: function render() {
	    console.log(this.state.edit);
	    if (this.state.edit) {
	      return React.createElement(
	        "li",
	        { className: "collection-item row" },
	        React.createElement(
	          "form",
	          { onSubmit: this.save },
	          React.createElement(
	            "div",
	            { className: "input-field col s12" },
	            React.createElement("input", { id: this.props.id, type: "text", className: "validate", onBlur: this.save, ref: "input" }),
	            React.createElement(
	              "label",
	              { "for": this.props.id },
	              this.props.label
	            )
	          )
	        )
	      );
	    }

	    return React.createElement(
	      "li",
	      { className: "collection-item row" },
	      React.createElement(
	        "p",
	        { className: "col s5" },
	        this.props.label
	      ),
	      React.createElement(
	        "p",
	        { className: "col s5" },
	        this.props.value
	      ),
	      React.createElement(
	        "a",
	        { className: "btn-floating btn-medium waves-effect waves-light green accent-4 right", onClick: this.edit },
	        React.createElement(
	          "i",
	          { className: "material-icons" },
	          "edit"
	        )
	      )
	    );
	  }
	});

	module.exports = ProfileDataField;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var ToolBar = React.createClass({
	  displayName: "ToolBar",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  onClickButton: function onClickButton(index, obj) {

	    this.props.selectContent(index);
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "row profileToolBar" },
	      React.createElement(
	        "div",
	        { className: "col s8 offset-s2 " },
	        React.createElement(
	          "a",
	          { onClick: this.onClickButton.bind(this, 0), className: "waves-effect waves-light btn green accent-4" },
	          React.createElement(
	            "i",
	            { className: "material-icons left" },
	            "speaker_notes"
	          ),
	          "Journal"
	        ),
	        React.createElement(
	          "a",
	          { onClick: this.onClickButton.bind(this, 1), index: "1", className: "waves-effect waves-light btn green accent-4" },
	          React.createElement(
	            "i",
	            { className: "material-icons left" },
	            "supervisor_account"
	          ),
	          "Amis"
	        ),
	        React.createElement(
	          "a",
	          { onClick: this.onClickButton.bind(this, 2), index: "2", className: "waves-effect waves-light btn green accent-4" },
	          React.createElement(
	            "i",
	            { className: "material-icons left" },
	            "description"
	          ),
	          "Infos"
	        )
	      )
	    );
	  }
	});

	module.exports = ToolBar;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(16);
	var MessageList = __webpack_require__(35);
	var Pagination = __webpack_require__(38);

	var Inbox = React.createClass({
	  displayName: 'Inbox',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var messages = [{ author: "ZLatan", body: "I'm looking for a new team, call me!", object: "The Legend", date: 1460887462 }, { author: "Jack Bauer", body: "Sir, you have to save the President !", object: "2 hours left...", date: 1433412262 }, { author: "Mickael Jackson", body: "Aouh !", object: "Black or White ?", date: 1424257462 }];

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(NavBar, null),
	      React.createElement(
	        'div',
	        { className: 'container' },
	        React.createElement(MessageList, { messages: messages }),
	        React.createElement(Pagination, null)
	      )
	    );
	  }
	});

	module.exports = Inbox;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var MessageLine = __webpack_require__(36);

	var MessageList = React.createClass({
	  displayName: 'MessageList',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  componentDidMount: function componentDidMount() {
	    $('#messageList').collapsible({
	      accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });
	  },
	  render: function render() {

	    var messageLines = this.props.messages.map(function (message, i) {
	      return React.createElement(MessageLine, { author: message.author, body: message.body, object: message.object, date: message.date, key: i });
	    });

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'ul',
	        { id: 'messageList', className: 'collapsible popout', 'data-collapsible': 'accordion' },
	        messageLines
	      )
	    );
	  }
	});

	module.exports = MessageList;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var moment = __webpack_require__(37);

	var MessageLine = React.createClass({
	  displayName: 'MessageLine',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var date = moment(this.props.date * 1000).format("MMMM Do");

	    return React.createElement(
	      'li',
	      null,
	      React.createElement(
	        'div',
	        { className: 'collapsible-header' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'i',
	            { className: 'material-icons' },
	            'whatshot'
	          ),
	          React.createElement(
	            'span',
	            { className: 'col s2', style: { fontWeight: "bold" } },
	            this.props.author
	          ),
	          React.createElement(
	            'span',
	            { className: 'col s4' },
	            this.props.object
	          ),
	          React.createElement(
	            'span',
	            { className: 'col s2 offset-s3', style: { textAlign: "right" } },
	            date
	          )
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'collapsible-body' },
	        React.createElement(
	          'p',
	          null,
	          this.props.body
	        )
	      )
	    );
	  }
	});

	module.exports = MessageLine;

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Pagination = React.createClass({
	  displayName: "Pagination",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    return React.createElement(
	      "ul",
	      { className: "pagination" },
	      React.createElement(
	        "li",
	        { className: "disabled" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          React.createElement(
	            "i",
	            { className: "material-icons transparent", style: { color: "#00C853" } },
	            "chevron_left"
	          )
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "active" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "1"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "2"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "3"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "4"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "5"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          React.createElement(
	            "i",
	            { className: "material-icons transparent", style: { color: "#00C853" } },
	            "chevron_right"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Pagination;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(16);
	var UserList = __webpack_require__(40);
	var Stats = __webpack_require__(42);

	var Admin = React.createClass({
	  displayName: 'Admin',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  componentDidMount: function componentDidMount() {
	    $('#adminTabs ul.tabs').tabs();
	  },
	  render: function render() {

	    var users = [{ name: "Chuck Norris" }, { name: "Jean CLaude VanDamme" }, { name: "Steven Seagal" }, { name: "Kurt Russel" }, { name: "Jon Snow" }, { name: "Beyonce" }, { name: "John Rambo" }, { name: "Chuck Norris" }, { name: "Jean CLaude VanDamme" }, { name: "Steven Seagal" }, { name: "Kurt Russel" }, { name: "Jon Snow" }, { name: "Beyonce" }, { name: "John Rambo" }];

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(NavBar, null),
	      React.createElement(
	        'div',
	        { className: 'container' },
	        React.createElement(
	          'div',
	          { id: 'adminTabs', className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'col s12' },
	            React.createElement(
	              'ul',
	              { className: 'tabs transparent' },
	              React.createElement(
	                'li',
	                { className: 'tab col s3' },
	                React.createElement(
	                  'a',
	                  { className: 'active', href: '#users' },
	                  'Utilisateurs'
	                )
	              ),
	              React.createElement(
	                'li',
	                { className: 'tab col s3' },
	                React.createElement(
	                  'a',
	                  { href: '#stats' },
	                  'Statistiques'
	                )
	              ),
	              React.createElement(
	                'li',
	                { className: 'tab col s3' },
	                React.createElement(
	                  'a',
	                  { href: '#test3' },
	                  'Test 3'
	                )
	              ),
	              React.createElement(
	                'li',
	                { className: 'tab col s3' },
	                React.createElement(
	                  'a',
	                  { href: '#test4' },
	                  'Test 4'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { id: 'users', className: 'col s12' },
	            React.createElement(UserList, { users: users })
	          ),
	          React.createElement(
	            'div',
	            { id: 'stats', className: 'col s12' },
	            React.createElement(Stats, null)
	          ),
	          React.createElement(
	            'div',
	            { id: 'test3', className: 'col s12' },
	            'Test 3'
	          ),
	          React.createElement(
	            'div',
	            { id: 'test4', className: 'col s12' },
	            'Test 4'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Admin;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);
	var UserListItem = __webpack_require__(41);

	var UserList = React.createClass({
	  displayName: 'UserList',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var userLines = this.props.users.map(function (user, i) {
	      return React.createElement(UserListItem, _extends({}, user, { key: i }));
	    });

	    return React.createElement(
	      'div',
	      { id: 'userList' },
	      React.createElement(
	        'ul',
	        { className: 'collection hoverable' },
	        userLines
	      )
	    );
	  }
	});

	module.exports = UserList;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var UserListItem = React.createClass({
	  displayName: "UserListItem",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    return React.createElement(
	      "li",
	      { className: "collection-item avatar" },
	      React.createElement("img", { src: "http://lorempixel.com/42/42/people", alt: "", className: "circle" }),
	      React.createElement(
	        "span",
	        { className: "title", style: { fontWeight: "bold" } },
	        this.props.name
	      ),
	      React.createElement(
	        "p",
	        null,
	        "First Line ",
	        React.createElement("br", null),
	        "Second Line"
	      ),
	      React.createElement(
	        "a",
	        { href: "#!", className: "secondary-content" },
	        React.createElement(
	          "i",
	          { className: "material-icons" },
	          "send"
	        )
	      )
	    );
	  }
	});

	module.exports = UserListItem;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Stats = React.createClass({
	  displayName: "Stats",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    return React.createElement(
	      "div",
	      { id: "stats" },
	      React.createElement(
	        "h1",
	        { style: {} },
	        "Statistiques"
	      )
	    );
	  }
	});

	module.exports = Stats;

/***/ }
/******/ ]);