var React = require('react');
var NavBar = require('../navbar/NavBar.jsx');
var Footer = require('../Footer.jsx');
var PostInput = require('./PostInput.jsx');
var Wall = require('./Wall.jsx');
var FriendsList = require("./FriendsList.jsx");
var ProfileData = require("./ProfileData.jsx");
var config = require('../../../config.js');
var PostsService = require('../../services/PostsService.jsx');
var UserService = require('../../services/UserService.jsx');


var ToolBar = require("./ToolBar.jsx");


var UserProfile = React.createClass({

  getInitialState() {

    console.log("profile initial state");

    return {
      display: 0,
      user: {},
      wall: []
    };
  },

  componentDidMount() {

      console.log("component did mount");

      var self = this;
      $('.profile_parallax').parallax();  


      $('#profilePicture').append($.cloudinary.unsigned_upload_tag("ygdxw3yr", 
        { cloud_name: 'minibook' }));

      $('.cloudinary_fileupload').hide();

      $('.cloudinary_fileupload').bind('cloudinarydone', function (e, data) {
       
        console.log(data.result);
        // let user = self.state.user;
        // user.avatar = data.result.secure_url;
        // self.setState({
        //   user: user
        // });

        self.updateProfile({
          label: "avatar",
          value: data.result.secure_url
        });

      });

      var self = this;
      this.findUserWallById(this.props.params.id, function(wall) {

          self.setState({
            user: wall.user,
            wall: wall.posts
          });

      });
  },

  componentDidUpdate(prevProps, prevState) {
      $('.wallPost .tooltipped').tooltip({delay: 50});  
  },

  

  findUserWallById(id, callback) {


     $.ajax({
        method: "GET",
          url: config[process.env.NODE_ENV].api + '/users/wall/' + id,
          data: {sessionId: localStorage.getItem("sessionId")},
          success: function(data, status) {
            
            callback(data);

          },
          error: function(jqXHR, status, error) {
            console.log("find user by id error");
            Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
          }

      });
  },


  selectContent(index) {
    this.setState({
      display: index
    });
  },

  createPost(post) {

    const self = this;
    const user = this.state.user;
    let wall = this.state.wall;


    var newPost = {
      body: post,
      created_by: {
        userId: user._id
      }
    };

    PostsService.create(newPost, user._id, function(result) {
      console.log("posts service callback");

      wall.unshift(newPost);

      self.setState({
        wall: wall
      });
      
    });

  },

  postComment(comment, postId) {

    const self = this;
    const user = this.state.user;
    let wall = this.state.wall;

    var newComment = {
      body: comment,
      created_by: {
        userId: user._id
      }
    };


    PostsService.addComment(newComment, postId, function() {

      for (var i = 0; i < wall.length; i++) {
        if (wall[i]._id == postId) {

          wall[i].comments.push(newComment);

          self.setState({
            wall: wall
          });

          break;
        }
      }

    });

  },

  selectAvatar() {
        $('.cloudinary_fileupload').trigger('click');
  },

  updateProfile(field) {

    const user = this.state.user;

    user[field.label] = field.value;
    this.setState({
      user: user
    });


    let updatedFields = {};
    updatedFields[field.label] = field.value;

    UserService.update(user._id, updatedFields, function() {
        Materialize.toast("Champs modifié avec succès", 2000, 'toastSuccess');
    });
  },

  render() {

    console.log("profile render");

    var displayContent;

    if (this.state.display === 0)
      displayContent = <Wall posts={this.state.wall} postComment={this.postComment}/>;
    else if (this.state.display == 1)
      displayContent = <FriendsList />;
    else if (this.state.display == 2)
      displayContent = <ProfileData profile={this.state.user} updateProfile={this.updateProfile} />;


    console.log(this.state.user);

    let avatar =  <i className="large material-icons" >add</i>;
    if (this.state.user.avatar) {
      let url = this.state.user.avatar;
      url = url.replace("/upload/", "/upload/w_200,h_200,c_fill/");
      avatar = <img src={url} />;
    }


    return (
        <div id="userProfile">

          <div className="parallax-container" >
            <div className="profile_parallax" >
              <img src="/images/user-background1.jpg" />
            </div>
            <div id="profilePicture" className="hoverable" onClick={this.selectAvatar} >
              {avatar}
            
            </div>
            <div className="container">
              <ToolBar selectContent={this.selectContent} />
              <PostInput post={this.createPost}/>
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
