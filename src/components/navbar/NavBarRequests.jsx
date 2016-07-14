var React = require('react');
var UserService = require("../../services/UserService.jsx");


var NavBarRequests = React.createClass({

    getInitialState() {
        return {
            requests: this.props.requests  
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            requests: nextProps.requests
        });
    },

    acceptRequest(index, e) {
        e.stopPropagation();

        var requests = this.state.requests;
        const request = this.state.requests[index];
        this.props.acceptRequest(request, index);
    },

    render() {

        const self = this;

        const requestsItems = this.state.requests.map(function(request, index) {

        const requestFrom = request.user;
        const fromFullname = requestFrom.firstname + " " + requestFrom.lastname;


        return <li key={index} className="collection-item requests-item">
                    {fromFullname}
                    <a className="btn-floating" onClick={self.acceptRequest.bind(null, index)} >
                        <i  className="material-icons">add</i>
                    </a>
                </li>
        });

        return (
            <div className="requestsList">
                <ul className="collection">
                {requestsItems}
                    
                </ul>

            </div>

        );
    }
});


module.exports = NavBarRequests;