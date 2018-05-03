import React, { Component } from "react";
import "./addPost.css";
import swal from "sweetalert";

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
    this.handleAddPost = this.handleAddPost.bind(this);
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

  handleAddPost() {
    if (this.state.newPost.length > 300) {
      alert("Too many characters!");
    } else {
      this.props
        .newPost(this.props.currentUser.user_id, this.state.newPost)
        .then(() => this.setState({ newPost: "" }));
      this.props.loginUser();
      this.props.getEmployersPosts();
    }
  }

  render() {
    const { newPost, currentUser, addExperienceSpecialty } = this.props;

    return (
      <div>
        {!this.state.postFlag ? (
          <div>
            <div className="post-btn-border">
              <div className="post-btn" onClick={() => this.togglePostFlag()}>
                <div className="plus-symbol" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="disable-bg" />
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
                    ? swal("Too many characters!")
                    : (this.props.newPost(
                        currentUser.user_id,
                        this.state.newPost
                      ),
                      this.props.loginUser(),
                      this.props.getEmployersPosts(),
                      this.togglePostFlag(),
                      this.setState({ newPost: "" }));
                }}
              >
                Add Post
              </button>
            </div>
            <div className="post-btn" onClick={() => this.togglePostFlag()}>
              <div className="plus-symbol" />
            </div>
          </div>
        )}
        <div>
          <div className="new-post-container-full">
            <textarea
              className="textarea"
              value={this.state.newPost}
              onChange={e => this.createPost(e.target.value)}
              placeholder="Limit 300 Characters..."
            />
            <button
              className="add-post-full"
              onClick={() => {
                this.props.newPost.length > 300
                  ? swal("Too many characters!")
                  : (this.props.newPost(
                      currentUser.user_id,
                      this.state.newPost
                    ),
                    this.props.loginUser(),
                    this.props.getEmployersPosts(),
                    this.setState({ newPost: "" }));
              }}
            >
              Add Post
            </button>
          </div>
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
