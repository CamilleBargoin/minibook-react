var React = require('react');


var FriendBox = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {


    // console.log($(document).width());

    // var size = $(window).width() / 15;

    const tooltip = "Dernier Statut de " + this.props.name;

    return (
        <div className="friendBox hoverable tooltipped" data-position="bottom" data-delay="50" data-tooltip={tooltip} style={{backgroundColor: this.props.color}}>
          <p>{this.props.name}</p>
        </div>
    );
  }

});

module.exports = FriendBox;
