var React = require('react');


var TaskListItem = React.createClass({

    getInitialState: function() {
        return {
              isEditing: false
        };
    },

    onEditing: function() {
        this.setState({
            isEditing: true
        });
    },
    cancelEditing: function() {
        this.setState({
            isEditing: false
        });
    },

    onDeleting: function() {

        this.props.deleteTask({
            _id: this.props._id
        });

    },

    renderActionSection: function() {

        if (this.state.isEditing) {
            return (
                <td>
                <button onClick={this.editLabel}>Save</button>
                <button onClick={this.cancelEditing}>Cancel</button>
            </td>
            );
        }

        return (
            <td>
                <button onClick={this.onEditing}>Edit</button>
                <button onClick={this.onDeleting}>Delete</button>
            </td>
        );
    },

    renderTasksSection: function() {



        var taskStyle = {
            cursor: 'pointer',
            color: this.props.isCompleted ? 'green' : 'red'
        };


        if (this.state.isEditing) {
            return (
                <td>
                    <form onSubmit={this.editLabel}>
                        <input type="text" defaultValue={this.props.label} ref="labelInput"/>
                    </form>
                </td>
            );
        }


        return (
            <td style={taskStyle} onClick={this.toggleComplete}>{this.props.label}</td>
        );

    },

    toggleComplete: function() {
       
       this.props.editTask(
       {
        _id: this.props._id,
        label: this.props.label,
        isCompleted: ! this.props.isCompleted
       });
    },

    editLabel: function(e) {
        e.preventDefault();

        this.props.editTask(
        {
            _id: this.props._id,
            label: this.refs.labelInput.value,
            isCompleted: this.props.isCompleted
        });

        this.setState({
            isEditing: false
        });
    },

    render: function() {


        return (
            <tr>
                {this.renderTasksSection()}
                {this.renderActionSection()}
            </tr>
        );
    }
});


module.exports = TaskListItem;