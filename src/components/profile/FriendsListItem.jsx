var React = require('react');
var browserHistory = require('react-router').browserHistory;


var FriendsListItem = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  displayProfile(e) {
    browserHistory.push("/profile/" + this.props.user._id);
  },

  render() {

    console.log(this.props.user);

    const user = this.props.user;
    let avatar = "";

    if (user.avatar)
      avatar = user.avatar.replace("/upload/", "/upload/w_42,h_42,c_fill/");

    return (
      <li className="collection-item avatar">
        <img onClick={this.displayProfile} src={avatar} alt="" className="circle pointer" />
        <span className="title">{user.firstname + " " + user.lastname}</span>
        
        <a onClick={this.displayProfile} className="secondary-content pointer"><i className="material-icons">send</i></a>
      </li>
          
    );
  }
});

module.exports = FriendsListItem;