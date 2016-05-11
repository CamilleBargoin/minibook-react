var React = require('react');
var TaskList = require('./TaskList.jsx');
var CreateTask = require("./CreateTask.jsx");
var $ = require("webpack-zepto");




var TodosApp = React.createClass({
    getInitialState: function() {

        return {
              tasks: []
        };
    },
    componentDidMount: function() {

        var self = this;

        $.getJSON('http://localhost:3000/getTasks', function(data){
         

            self.setState({
                tasks: JSON.parse(data)
            });
        });

    },
    createTask: function(newTaskLabel) {
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
          success: function(taskId) {

            newTask._id = taskId;


            tasks.push(newTask);

            self.setState({
                tasks: tasks
            });
          }
        });
    },

    editTask: function(task) {

        for (var i = 0; i < this.state.tasks.length; i++) {
          if (this.state.tasks[i]._id == task._id) {

            var self = this;

            $.ajax({
              type: 'POST',
              url: 'http://localhost:3000/updateTask',
              data: JSON.stringify(task),
              contentType: 'application/json',
              success: function(result) {

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

    deleteTask: function(task) {

        for (var i = 0; i < this.state.tasks.length; i++) {
          if (this.state.tasks[i]._id == task._id) {

            var self = this;

            $.ajax({
              type: 'POST',
              url: 'http://localhost:3000/deleteTask',
              data: JSON.stringify(task),
              contentType: 'application/json',
              success: function(result) {

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

    render: function() {


        console.log(this.state.tasks);


        return (
            <div>
                <h2>MY TODO APP</h2>
                <CreateTask createTask = {this.createTask}/>
                <TaskList tasks = {this.state.tasks} editTask = {this.editTask} deleteTask = {this.deleteTask}/>
            </div>
        );
    }
});


module.exports = TodosApp;