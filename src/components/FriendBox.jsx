var React = require('react');
var browserHistory = require('react-router').browserHistory;



var FriendBox = React.createClass({

  componentDidMount() {
      
  },

  openFriendProfile() {
    $('.friendBox.tooltipped').tooltip("remove");
    browserHistory.push('/profile/' + this.props.friendship.user._id);

  },

  render() {

    let lastPost = this.props.friendship.user.last_post || "";
    let tooltip;

    if (!lastPost || lastPost == "") {
      const statusArray = ["Hasta la vista baby !", 
        "Why so serious ?", 
        "May the force be with you.", 
        "I'll be back.", 
        "Are you not entertained ?",
        "You talkin' to me ?", 
        "I love the smell of Napalm in the morning",
        "I am your father",
        "I’m the king of the world !",
        "It’s alive! It’s alive !",
        "You shall not pass !",
        "Madness ? This is Sparta !",
        "Winter is coming."
      ]
      tooltip = statusArray[Math.floor(Math.random() * statusArray.length)];
    }
    else if (lastPost.length < 50)
      tooltip = lastPost;
    else {
      tooltip = lastPost.substr(0, 50) + "...";
    }


    const colorArray = [
      "#1ABC9C",
      "#2ECC71",
      "#3498DB",
      "#AF7AC4",
      "#34495E",
      "#F1C40F",
      "#E67E22",
      "#E74C3C",
      "#ECF0F1",
      "#AAB7B7"
    ];

    const backgroundColor = colorArray[Math.floor(Math.random() * colorArray.length)];

console.log(this.props.friendship.user.avatar);
    let avatar = <div />
    if (this.props.friendship.user.avatar) {
      const url = this.props.friendship.user.avatar.replace("/upload/", "/upload/w_160,h_160,c_fill/");
      avatar = <img src={url} />
    }

    return (
        <div onClick={this.openFriendProfile} className="friendBox hoverable tooltipped" data-position="bottom" data-delay="50" data-tooltip={tooltip} style={{backgroundColor: backgroundColor}}>
          {avatar}
          <p>{this.props.friendship.user.firstname + " " + this.props.friendship.user.lastname }</p>
        </div>
    );
  }

});

module.exports = FriendBox;
