var React = require('react');
var FeedCommentBox = require('./FeedCommentBox.jsx');

var WallFeed = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
        <div style={{margin: "50px 0"}} className="wallFeed row">
          <div className="col l1 offset-l2 m1 offset-m1 s1">
            <div style={{height: "60px", width: "60px", marginTop: "7px"}} className="blue tooltipped hoverable" data-position="left" data-delay="50" data-tooltip="Camille Bargoin">
            </div>
          </div>
          <div className="grey lighten-5 card-panel hoverable col l6 m8 offset-m1 s10 offset-s1">
            <p className="feedText">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
            <FeedCommentBox />
            
          </div>
          <div className="input-field col l6 offset-l3 m8 offset-m3 s10 offset-s2">
            <input id="feedAComment" type="text" className="validate" />
            <label for="feedAComment">Un commentaire ?</label>
          </div>
        </div>
    );
  }

});

module.exports = WallFeed;