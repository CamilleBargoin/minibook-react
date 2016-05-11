var React = require('react');
var FriendBox = require('./FriendBox.jsx');

var FriendBoxContainer = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {

    var friends = [{
      name:"albert",
      color: "#47B8E0"
    },{
      name:"Bertrand",
      color: "#FFC952"
    },{
      name:"Camille",
      color: "#FF7473"
    },{
      name:"Donald",
      color: "#47B8E0"
    },{
      name:"Etienne",
      color: "#FFC952"
    },{
      name:"Francois",
      color: "#FF7473"
    },{
      name:"Gertrude",
      color: "#47B8E0"
    },{
      name:"Henry",
      color: "#FFC952"
    },{
      name:"Igor",
      color: "#FF7473"
    },{
      name:"Janine",
      color: "#47B8E0"
    },{
      name:"Kamel",
      color: "#FFC952"
    },{
      name:"Léonidas",
      color: "#FF7473"
    },{
      name:"Marine",
      color: "#47B8E0"
    },{
      name:"Noël",
      color: "#FFC952"
    },{
      name:"Ophélie",
      color: "#FF7473"
    },{
      name:"Patrick",
      color: "#47B8E0"
    },{
      name:"Quiburn",
      color: "#FFC952"
    },{
      name:"Rahan",
      color: "#FF7473"
    },{
      name:"Sylvain",
      color: "#47B8E0"
    },{
      name:"Théodore",
      color: "#FFC952"
    },{
      name:"Ursula",
      color: "#FF7473"
    },{
      name:"Voldemort",
      color: "#47B8E0"
    },{
      name:"Wanda",
      color: "#FFC952"
    },{
      name:"Xavier",
      color: "#FF7473"
    },{
      name:"Yvette",
      color: "#47B8E0"
    },{
      name:"Zoé",
      color: "#FFC952"
    }];


    var friendBoxes = friends.map(function(friend, i) {
      return (
        <FriendBox name={friend.name} key={i} color={friend.color} />
      );
    });

    return (
      <div style={{  overflow: "hidden", whiteSpace:"nowrap"}}>
         {friendBoxes}
      </div>
    );
  }

});

module.exports = FriendBoxContainer;
