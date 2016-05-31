var React = require('react');
var browserHistory = require('react-router').browserHistory;



var FriendBox = React.createClass({

  openFriendProfile() {

    browserHistory.push('/profile/' + this.props.name);

  },

  render() {
    const tooltip = "Dernier Statut de " + this.props.name;

    return (
        <div onClick={this.openFriendProfile} className="friendBox hoverable tooltipped" data-position="bottom" data-delay="50" data-tooltip={tooltip} style={{backgroundColor: this.props.color}}>
          <p>{this.props.name}</p>
        </div>
    );
  }

});

module.exports = FriendBox;
