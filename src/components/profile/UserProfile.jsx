var React = require('react');
var NavBar = require('../NavBar.jsx');
var Footer = require('../Footer.jsx');
var PostNewFeed = require('./PostNewFeed.jsx');
var Wall = require('./Wall.jsx');
var FriendsList = require("./FriendsList.jsx");
var ProfileData = require("./ProfileData.jsx");
var config = require('../../../config.js');


var ToolBar = require("./ToolBar.jsx");


var UserProfile = React.createClass({

  getInitialState() {

    return {
      display: 0,
      user: {
        posts: []
      }
    };
  },

  componentDidMount() {
      $('.profile_parallax').parallax();  

      var self = this;
      this.findUserById(localStorage.getItem('userId'), function(user) {
        
        self.setState({
          user: user
        });


      });
  },

  findUserById(id, callback) {


     $.ajax({
        method: "GET",
          url: config[process.env.NODE_ENV].api + '/users/' + id,
          data: {sessionId: localStorage.getItem("sessionId")},
          success: function(data, status) {
            
            callback(data);

          },
          error: function(jqXHR, status, error) {
            console.log("find user by id error");
            Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
          }

      });



  

    // return {
    //   profile: {
    //     firstname: "Camille",
    //     lastname: "Bargoin",
    //     age: 30,
    //     email: "camille@minibook.com",
    //     address: "87 rue Saint Fargeau",
    //     city: "Paris"
    //   },
    //   posts: [
    //     {
    //       id: 1,
    //       body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    //       comments: [
    //         {
    //           author: "John Rambo",
    //           body: "Yeah ca claque!"
    //         },
    //         {
    //           author: "Miley Cirus",
    //           body: "Lolilol"
    //         },
    //         {
    //           author: "Cmd Cousteau",
    //           body: "..."
    //         }
    //       ]
    //     },
    //     {
    //       id: 2,
    //       body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    //       comments: [
    //         {
    //           author: "John Rambo",
    //           body: "Yeah ca claque!"
    //         },
    //         {
    //           author: "Miley Cirus",
    //           body: "Lolilol"
    //         },
    //         {
    //           author: "Cmd Cousteau",
    //           body: "..."
    //         }
    //       ]
    //     },
    //     {
    //       id: 3,
    //       body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    //       comments: [
    //         {
    //           author: "John Rambo",
    //           body: "Yeah ca claque!"
    //         },
    //         {
    //           author: "Miley Cirus",
    //           body: "Lolilol"
    //         },
    //         {
    //           author: "Cmd Cousteau",
    //           body: "..."
    //         }
    //       ]
    //     }
    //   ]
    // };
  },

  selectContent(index) {
    this.setState({
      display: index
    });
  },

  postFeed(post) {

    const user = this.state.user;
    user.posts.unshift({
      id: Math.random() * 10000000,
      body: post,
      comments: []
    });

    this.setState({
      user: user
    });


    // CALL API SERVER & SAVE IN DATABASE

  },

  postComment(comment, postId) {

    console.log(comment);
    console.log(postId);

    const user = this.state.user;

    for (var i = 0; i < user.posts.length; i++) {
      if (user.posts[i].id == postId) {
        user.posts[i].comments.push({
          author: this.state.user.firstname + " " + this.state.user.lastname,
          body: comment
        });

        this.setState({
          user: user
        });

        // CALL API SERVER & SAVE IN DATABASE
        break;
      }
    }
  },

  updateProfile(field) {

      const user = this.state.user;
      user[field.label] = field.value;

      this.setState({
        user: user
      });


      // CALL API SERVER & SAVE IN DATABASE

  },

  render() {


    var displayContent;

    if (this.state.display === 0)
      displayContent = <Wall posts={this.state.user.posts} postComment={this.postComment}/>;
    else if (this.state.display == 1)
      displayContent = <FriendsList />;
    else if (this.state.display == 2)
      displayContent = <ProfileData profile={this.state.user} updateProfile={this.updateProfile} />;

    return (
        <div id="userProfile">
          <NavBar />

          <div className="parallax-container" >
            <div className="profile_parallax" >
              <img src="/images/user-background1.jpg" />
            </div>
            <div id="profilePicture" className="hoverable">
              <i className="large material-icons" >add</i>
            </div>
            <div className="container">
              <ToolBar selectContent={this.selectContent} />
              <PostNewFeed post={this.postFeed}/>
            </div>
          </div>

          {displayContent}
          <div style={{height:"350px"}} />
          {/*<Footer />*/}
        </div>
    );
  }

});

module.exports = UserProfile;
