var React = require('react');
var moment = require("moment");
var browserHistory = require('react-router').browserHistory;
var UserService = require('../../services/UserService.jsx');


var UserListItem = React.createClass({

  getInitialState() {
    return {
      user: this.props
    };
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        user: nextProps
      })  
  },

  displayProfile() {
      browserHistory.push("/profile/" + this.props._id);
  },


  handleSwitch(e) {

    var user = jQuery.extend({}, this.state.user);

    if (user.role%10 == 0) {
      user.role = parseInt(user.role, 10) /10;
      console.log(user.role);
    }
    else {
        user.role = parseInt(user.role, 10) * 10;
      console.log(user.role);
    }

    let updatedFields = {
      role: user.role
    };

    const self = this;

    UserService.update(user._id, updatedFields, function() {

      self.setState({
        user: user
      });
    });

  },
  
  render() {


    const registerDate = moment(this.state.created_at);

    let url = ""
    if (this.state.user.avatar) {
      url = this.state.user.avatar.replace("/upload/", "/upload/w_42,h_42,c_fill/");
    }

    const friendships = this.state.user.friends;
    let friendsNumber = 0, sentInvitesNumber = 0, receivedInvitesNumber = 0; 



    for (var i = 0; i < friendships.length; i++) {
      if (friendships[i].status == "accepted")
        friendsNumber ++;
      else if (friendships[i].status == "pending")
        receivedInvitesNumber ++;
      else if (friendships[i].status == "sentRequest")
        sentInvitesNumber ++;
    }


    var blocked = false;
    var cssClass = "collection-item avatar";

    if (this.state.user.role == 2) {
      cssClass += " admin";
    }
    else if (this.state.user.role%10 == 0) {
      cssClass += " blocked";
      blocked = true;
    }


    return (
      
      <li className={cssClass}>
        <a onClick={this.displayProfile} ><img src={url} alt="" className="circle" /></a>
        <span className="title" style={{fontWeight:"bold"}}>{this.state.user.firstname + " " + this.state.user.lastname}</span>
        <p>Date d&#39;inscription: <strong>{registerDate.format("DD/MM/YYYY")}</strong><br/>
           Amis: <strong>{friendsNumber}</strong> / Invitations envoyées: <strong>{sentInvitesNumber}</strong> / Invitations en attentes: <strong>{receivedInvitesNumber}</strong>
        </p>
        <div className="switch">
          <label>
            
            <input type="checkbox" checked={blocked} onChange={this.handleSwitch} ref="switch"/>
            <span className="lever"></span>
            Bloqué
          </label>
        </div>
        <a onClick={this.displayProfile}  className="secondary-content"><i className="material-icons">send</i></a>
      </li>
            
    );
  }

});

module.exports = UserListItem;
