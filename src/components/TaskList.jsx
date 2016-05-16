// var React = require('react');
// var TaskListItem = require('./TaskListItem.jsx');


// var TaskList = React.createClass({

//     getInitialState: function() {

//         return {
              
//         };
//     },



//     render: function() {

//         var methods = {
//             editTask: this.props.editTask,
//             deleteTask: this.props.deleteTask
//         };


//         var listItems = this.props.tasks.map(function(task, index) {

//             return <TaskListItem key={index} {...task} {... methods}/>;
//         });

//         return (
//             <div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Tasks</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {listItems}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// });


// module.exports = TaskList;