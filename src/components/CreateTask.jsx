var React = require('react');


var CreateTask = React.createClass({

    onCreate: function(e) {
        e.preventDefault();

        this.props.createTask(this.refs.createInput.value);
        this.refs.createInput.value = "";
    },

    render: function() {
        return (
            <form onSubmit={this.onCreate}>
                <input type="text" placeholder="what do I need to do ?!!" ref="createInput" />
                <button>Add</button>
            </form>
        );
    }
});


module.exports = CreateTask;