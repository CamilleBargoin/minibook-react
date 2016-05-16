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

	/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(1);
	var path = __webpack_require__(2);

	// var compression = require('compression');

	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(4);
	var match = __webpack_require__(5).match;
	var RouterContext = __webpack_require__(5).RouterContext;
	var routes = __webpack_require__(6);

	var app = express();
	// app.use(compression());

	// serve our static stuff like index.css
	//app.use(express.static(__dirname));
	app.use(express.static(path.join(__dirname, 'public')));

	// send all requests to index.html so browserHistory in React Router works
	app.get('*', function (req, res) {
	  res.send("yeah");
	  match({ routes: routes, location: req.url }, function (err, redirect, props) {

	    res.send("yeah");

	    // if (err) {
	    //   // there was an error somewhere during route matching
	    //   res.status(500).send(err.message);
	    // } else if (redirect) {

	    //   res.redirect(redirect.pathname + redirect.search);
	    // } else if (props) {

	    //   var appHtml = ReactDOM.renderToString(<RouterContext {...props}/>);
	    //   res.send(renderPage(appHtml));
	    // } else {

	    //   // no errors, no redirect, we just didn't match anything
	    //   res.status(404).send('Not Found')
	    // }
	  });
	});

	function renderPage(appHtml) {
	  return '<!doctype html public="storage">' + '<html>' + '<meta charset=utf-8/>' + '<title>My First React Router App</title>' + '<div id=app>${appHtml}</div>' + '<script src="/bundle.js"></script>';
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

	module.exports = require("react-dom");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	var React = __webpack_require__(3);
	var Route = __webpack_require__(5).Route;
	var IndexRoute = __webpack_require__(5).IndexRoute;

	var TodosApp = __webpack_require__(7);
	var Users = __webpack_require__(12);
	var Home = __webpack_require__(14);
	var App = __webpack_require__(15);

	module.exports = React.createElement(
	  Route,
	  { path: '/', component: App },
	  React.createElement(IndexRoute, { component: Home }),
	  React.createElement(Route, { path: '/users', component: Users }),
	  React.createElement(Route, { path: '/todos', component: TodosApp })
	);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var TaskList = __webpack_require__(8);
	var CreateTask = __webpack_require__(10);
	var $ = __webpack_require__(11);

	var TodosApp = React.createClass({
	    displayName: 'TodosApp',

	    getInitialState: function () {

	        return {
	            tasks: []
	        };
	    },
	    componentDidMount: function () {

	        var self = this;

	        $.getJSON('http://localhost:3000/getTasks', function (data) {

	            self.setState({
	                tasks: JSON.parse(data)
	            });
	        });
	    },
	    createTask: function (newTaskLabel) {
	        var tasks = this.state.tasks;

	        var newTask = {
	            label: newTaskLabel,
	            isCompleted: false
	        };

	        var self = this;

	        $.ajax({
	            type: 'POST',
	            url: 'http://localhost:3000/createTask',
	            // post payload:
	            data: JSON.stringify(newTask),
	            contentType: 'application/json',
	            success: function (taskId) {

	                newTask._id = taskId;

	                tasks.push(newTask);

	                self.setState({
	                    tasks: tasks
	                });
	            }
	        });
	    },

	    editTask: function (task) {

	        for (var i = 0; i < this.state.tasks.length; i++) {
	            if (this.state.tasks[i]._id == task._id) {

	                var self = this;

	                $.ajax({
	                    type: 'POST',
	                    url: 'http://localhost:3000/updateTask',
	                    data: JSON.stringify(task),
	                    contentType: 'application/json',
	                    success: function (result) {

	                        self.state.tasks[i] = task;
	                        self.setState({
	                            tasks: self.state.tasks
	                        });
	                    }
	                });
	                break;
	            }
	        }
	    },

	    deleteTask: function (task) {

	        for (var i = 0; i < this.state.tasks.length; i++) {
	            if (this.state.tasks[i]._id == task._id) {

	                var self = this;

	                $.ajax({
	                    type: 'POST',
	                    url: 'http://localhost:3000/deleteTask',
	                    data: JSON.stringify(task),
	                    contentType: 'application/json',
	                    success: function (result) {

	                        self.state.tasks.splice(i, 1);
	                        self.setState({
	                            tasks: self.state.tasks
	                        });
	                    }
	                });
	                break;
	            }
	        }
	    },

	    render: function () {

	        console.log(this.state.tasks);

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'h2',
	                null,
	                'MY TODO APP'
	            ),
	            React.createElement(CreateTask, { createTask: this.createTask }),
	            React.createElement(TaskList, { tasks: this.state.tasks, editTask: this.editTask, deleteTask: this.deleteTask })
	        );
	    }
	});

	module.exports = TodosApp;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);
	var TaskListItem = __webpack_require__(9);

	var TaskList = React.createClass({
	    displayName: 'TaskList',


	    getInitialState: function () {

	        return {};
	    },

	    render: function () {

	        var methods = {
	            editTask: this.props.editTask,
	            deleteTask: this.props.deleteTask
	        };

	        var listItems = this.props.tasks.map(function (task, index) {

	            return React.createElement(TaskListItem, _extends({ key: index }, task, methods));
	        });

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'table',
	                null,
	                React.createElement(
	                    'thead',
	                    null,
	                    React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                            'th',
	                            null,
	                            'Tasks'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            'Actions'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    listItems
	                )
	            )
	        );
	    }
	});

	module.exports = TaskList;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);

	var TaskListItem = React.createClass({
	    displayName: 'TaskListItem',


	    getInitialState: function () {
	        return {
	            isEditing: false
	        };
	    },

	    onEditing: function () {
	        this.setState({
	            isEditing: true
	        });
	    },
	    cancelEditing: function () {
	        this.setState({
	            isEditing: false
	        });
	    },

	    onDeleting: function () {

	        this.props.deleteTask({
	            _id: this.props._id
	        });
	    },

	    renderActionSection: function () {

	        if (this.state.isEditing) {
	            return React.createElement(
	                'td',
	                null,
	                React.createElement(
	                    'button',
	                    { onClick: this.editLabel },
	                    'Save'
	                ),
	                React.createElement(
	                    'button',
	                    { onClick: this.cancelEditing },
	                    'Cancel'
	                )
	            );
	        }

	        return React.createElement(
	            'td',
	            null,
	            React.createElement(
	                'button',
	                { onClick: this.onEditing },
	                'Edit'
	            ),
	            React.createElement(
	                'button',
	                { onClick: this.onDeleting },
	                'Delete'
	            )
	        );
	    },

	    renderTasksSection: function () {

	        var taskStyle = {
	            cursor: 'pointer',
	            color: this.props.isCompleted ? 'green' : 'red'
	        };

	        if (this.state.isEditing) {
	            return React.createElement(
	                'td',
	                null,
	                React.createElement(
	                    'form',
	                    { onSubmit: this.editLabel },
	                    React.createElement('input', { type: 'text', defaultValue: this.props.label, ref: 'labelInput' })
	                )
	            );
	        }

	        return React.createElement(
	            'td',
	            { style: taskStyle, onClick: this.toggleComplete },
	            this.props.label
	        );
	    },

	    toggleComplete: function () {

	        this.props.editTask({
	            _id: this.props._id,
	            label: this.props.label,
	            isCompleted: !this.props.isCompleted
	        });
	    },

	    editLabel: function (e) {
	        e.preventDefault();

	        this.props.editTask({
	            _id: this.props._id,
	            label: this.refs.labelInput.value,
	            isCompleted: this.props.isCompleted
	        });

	        this.setState({
	            isEditing: false
	        });
	    },

	    render: function () {

	        return React.createElement(
	            'tr',
	            null,
	            this.renderTasksSection(),
	            this.renderActionSection()
	        );
	    }
	});

	module.exports = TaskListItem;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);

	var CreateTask = React.createClass({
	    displayName: "CreateTask",


	    onCreate: function (e) {
	        e.preventDefault();

	        this.props.createTask(this.refs.createInput.value);
	        this.refs.createInput.value = "";
	    },

	    render: function () {
	        return React.createElement(
	            "form",
	            { onSubmit: this.onCreate },
	            React.createElement("input", { type: "text", placeholder: "what do I need to do ?", ref: "createInput" }),
	            React.createElement(
	                "button",
	                null,
	                "Add"
	            )
	        );
	    }
	});

	module.exports = CreateTask;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("webpack-zepto");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var NavLink = __webpack_require__(13);
	var Users = React.createClass({
	  displayName: 'Users',


	  getInitialState: function () {
	    return {
	      test: 'foo'
	    };
	  },
	  contextTypes: {
	    router: React.PropTypes.object
	  },
	  render: function () {

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var Link = __webpack_require__(5).Link;

	var NavLink = React.createClass({
	  displayName: 'NavLink',


	  render: function () {
	    return React.createElement(Link, this.props);
	  }

	});

	module.exports = NavLink;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);

	var Home = React.createClass({
	  displayName: 'Home',


	  getInitialState: function () {
	    return {
	      test: 'foo'
	    };
	  },
	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        ' HOME !!!!'
	      )
	    );
	  }

	});

	module.exports = Home;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var NavLink = __webpack_require__(13);
	var IndexLink = __webpack_require__(5).IndexLink;

	var App = React.createClass({
	  displayName: 'App',


	  getInitialState: function () {
	    return {
	      test: "test"
	    };
	  },
	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        'React Router Tutorial'
	      ),
	      React.createElement(
	        'ul',
	        { role: 'nav' },
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            NavLink,
	            { to: '/', onlyActiveOnIndex: true },
	            'Home'
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            NavLink,
	            { to: '/users' },
	            'Users'
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            NavLink,
	            { to: '/todos' },
	            'Todos'
	          )
	        )
	      ),
	      this.props.children
	    );
	  }

	});

	module.exports = App;

/***/ }
/******/ ]);