import React, { Component } from "react";
import "./addPost.css";

import { connect } from "react-redux";

import {
  newPost,
  loginUser,
  getEmployersPosts
} from "../../../redux/reducers/userReducer";

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      postFlag: false,
      newPost: ""
    };
    this.togglePostFlag = this.togglePostFlag.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  togglePostFlag() {
    this.setState({
      postFlag: !this.state.postFlag
    });
  }

  createPost(val) {
    this.setState({
      newPost: val
    });
  }

  render() {
    const { newPost, currentUser, addExperienceSpecialty } = this.props;

    return (
      <div>
        {!this.state.postFlag ? (
          <div className="post-btn" onClick={() => this.togglePostFlag()} />
        ) : (
          <div>
            <div className="new-post-container">
              <textarea
                className="textarea"
                onChange={e => this.createPost(e.target.value)}
                placeholder="Limit 300 Characters..."
              />
              <button
                className="add-post"
                onClick={() => {
                  this.props.newPost.length > 300
                    ? alert("Too many characters!")
                    : (this.props.newPost(
                        currentUser.user_id,
                        this.state.newPost
                      ),
                      this.props.loginUser(),
                      this.props.getEmployersPosts(),
                      this.togglePostFlag());
                }}
              >
                Add Post
              </button>
            </div>
            <div className="post-btn" onClick={() => this.togglePostFlag()} />
          </div>
        )}
        <div className="new-post-container-full">
          <textarea
            className="textarea"
            onChange={e => this.createPost(e.target.value)}
            placeholder="Limit 300 Characters..."
          />
          <button
            className="add-post"
            onClick={() => {
              this.props.newPost.length > 300
                ? alert("Too many characters!")
                : (this.props.newPost(currentUser.user_id, this.state.newPost),
                  this.props.loginUser(),
                  this.props.getEmployersPosts(),
                  this.togglePostFlag());
            }}
          >
            Add Post
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, {
  newPost,
  loginUser,
  getEmployersPosts
})(AddPost);
