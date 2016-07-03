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

        let requests = this.state.requests;

        const request = this.state.requests[index];
        const self = this;

        console.log(request);


        // UserService.befriend(request.from, function(e) {
        //     UserService.deleteRequest(request._id, function(e) {

        //         requests = requests.splice(index, 1);
        //         self.setState({
        //             requests: requests
        //         });

        //     });
        // });
    },

    render() {


        const self = this;

        const requestsItems = this.state.requests.map(function(request, index) {

            const requestFrom = request.user;
            const fromFullname = requestFrom.firstname + " " + requestFrom.lastname;

            return <li key={index} href="#!" className="collection-item requests-item">
                        {fromFullname}
                        <a className="btn-floating" onClick={self.acceptRequest.bind(this, index)} >
                            <i  className="material-icons">add</i>
                        </a>
                    </li>
        });

        console.log(this.state.requests);

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