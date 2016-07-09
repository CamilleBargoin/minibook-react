var React = require('react');
var moment = require("moment");

var UserListItem = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  
  render() {

    console.log(this.props);

    const registerDate = moment(this.props.created_at);

    let url = ""
    if (this.props.avatar) {
      url = this.props.avatar.replace("/upload/", "/upload/w_42,h_42,c_fill/");
    }

    const friendships = this.props.friends;
    let friendsNumber = 0, sentInvitesNumber = 0, receivedInvitesNumber = 0; 

    for (var i = 0; i < friendships.length; i++) {
      if (friendships[i].status == "accepted")
        friendsNumber ++;
      else if (friendships[i].status == "pending")
        receivedInvitesNumber ++;
      else if (friendships[i].status == "sentRequest")
        receivedInvitesNumber ++;
    }



    var cssClass = "collection-item avatar";

    if (this.props.role == 2) {
      cssClass += " admin";
    }
    else if (this.props.role == 3) {
      cssClass += " blocked";
    }

    return (
      
      <li className={cssClass}>
        <a href= {"/profile/" + this.props._id}><img src={url} alt="" className="circle" /></a>
        <span className="title" style={{fontWeight:"bold"}}>{this.props.firstname + " " + this.props.lastname}</span>
        <p>Date d&#39;inscription: <strong>{registerDate.format("DD/MM/YYYY")}</strong><br/>
           Amis: <strong>{friendsNumber}</strong> / Invitations envoyées: <strong>{sentInvitesNumber}</strong> / Invitations en attentes: <strong>{receivedInvitesNumber}</strong>
        </p>
        <a href= {"/profile/" + this.props._id}  className="secondary-content"><i className="material-icons">send</i></a>
      </li>
            
    );
  }

});

module.exports = UserListItem;
