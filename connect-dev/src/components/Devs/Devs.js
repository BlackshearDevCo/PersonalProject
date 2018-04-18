import React, { Component } from "react";
import Footer from '../Footer/Footer';
import "./devs.css";
import AddPost from "./AddPost/AddPost";

import { Link } from 'react-router-dom';

import { connect } from "react-redux";

import { getPosts, loginUser } from "../../redux/reducers/userReducer";

class Devs extends Component {
  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
    this.props.getPosts();
  }

  render() {
    return (
      <div>
        {this.props.posts && this.props.posts.length > 0 ? (
          this.props.posts
            .map((cur, ind) => {
              return (
                <div key={ind} className="post-container">
                  <div className="user-container">
                    <img src={cur.profile_picture} className="post-pfp" />
                    <Link to={`/user/${cur.user_id}`}>
                    <h3 id={cur.user_id} className="post-username">
                      {cur.first_name}
                    </h3>
                    </Link>
                  </div>
                  <p id={cur.post_id} className="post-body">
                    {cur.post_body}
                  </p>
                </div>
              );
            })
        ) : (
          <h1>No Posts</h1>
        )}
        <div>
        {
          this.props.currentUser && this.props.currentUser.user_type === 1 ?
          <AddPost />
          :
          null 
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return { ...state };
  };

export default connect(mapStateToProps, { getPosts, loginUser })(Devs);
