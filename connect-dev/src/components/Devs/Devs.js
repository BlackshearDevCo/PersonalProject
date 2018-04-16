import React, { Component } from "react";
import "./devs.css";

import { connect } from "react-redux";

import { getPosts } from "../../redux/reducers/userReducer";

class Devs extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    console.log(this.props.posts);
    return (
      <div>
        {this.props.posts ? (
          this.props.posts.map((cur, ind) => {
            return (
              // <p key={ind}>{cur.post_body}</p>
              <div key={ind} className="post-container">
                <div className='user-container'>
                  <img src={cur.profile_picture} className="post-pfp" />
                  <h3 id={cur.user_id} className='post-username'>{cur.first_name}</h3>
                </div>
                <p id={cur.post_id} className='post-body'>{cur.post_body}</p>
              </div>
            );
          }).sort()
        ) : (
          <h1>No Posts</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getPosts })(Devs);
