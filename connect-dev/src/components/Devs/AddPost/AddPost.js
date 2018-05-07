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
      newPost: "",
      keyCode: null
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
    const { currentUser } = this.props;

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
                onKeyDown={e => this.setState({ keyCode: e.keyCode })}
              />
              <button
                className="add-post-full"
                onClick={() => {
                  if (this.state.newPost.length > 300) {
                    swal("Post Deleted!", "Too many characters", "warning");
                    this.setState({ newPost: "" });
                  } else if (this.state.newPost.length < 1) {
                    swal(
                      "Empty Post!",
                      "Please enter in a valid message",
                      "warning"
                    );
                    this.setState({ newPost: "" });
                  } else if (this.state.newPost[0] == " ") {
                    let trimmedPost = this.state.newPost.trim();
                    if (trimmedPost.length === 0) {
                      swal(
                        "Empty Post!",
                        "Please enter in a valid message",
                        "warning"
                      );
                      this.setState({ newPost: "" });
                    } else {
                      this.props
                        .newPost(currentUser.user_id, trimmedPost)
                        .then(() => {
                          this.props.loginUser();
                          this.props.getEmployersPosts();
                          this.setState({ newPost: "" });
                        });
                    }
                  } else if (this.state.keyCode === 13) {
                    let trimmedPost = this.state.newPost.trim();
                    if (trimmedPost.length === 0) {
                      swal(
                        "Empty Post!",
                        "Please enter in a valid message",
                        "warning"
                      );
                      this.setState({ newPost: "" });
                    } else {
                      this.props
                        .newPost(currentUser.user_id, trimmedPost)
                        .then(() => {
                          this.props.loginUser();
                          this.props.getEmployersPosts();
                          this.setState({ newPost: "" });
                        });
                    }
                  } else {
                    this.props
                      .newPost(currentUser.user_id, this.state.newPost)
                      .then(() => {
                        this.props.loginUser();
                        this.props.getEmployersPosts();
                        this.setState({ newPost: "" });
                      });
                  }
                }}
              >
                Add Post
              </button>
            </div>
            <div className="post-btn-border">
              <div className="post-btn" onClick={() => this.togglePostFlag()}>
                <div className="plus-symbol" />
              </div>
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
              onKeyDown={e => this.setState({ keyCode: e.keyCode })}
            />
            <button
              className="add-post-full"
              onClick={() => {
                if (this.state.newPost.length > 300) {
                  swal("Post Deleted!", "Too many characters", "warning"),
                    this.setState({ newPost: "" });
                } else if (this.state.newPost.length < 1) {
                  swal(
                    "Empty Post!",
                    "Please enter in a valid message",
                    "warning"
                  );
                  this.setState({ newPost: "" });
                } else if (this.state.newPost[0] == " ") {
                  let trimmedPost = this.state.newPost.trim();
                  if (trimmedPost.length === 0) {
                    swal(
                      "Empty Post!",
                      "Please enter in a valid message",
                      "warning"
                    );
                    this.setState({ newPost: "" });
                  } else {
                    this.props
                      .newPost(currentUser.user_id, trimmedPost)
                      .then(() => {
                        this.props.loginUser();
                        this.props.getEmployersPosts();
                        this.setState({ newPost: "" });
                      });
                  }
                } else if (this.state.keyCode === 13) {
                  let trimmedPost = this.state.newPost.trim();
                  if (trimmedPost.length === 0) {
                    swal(
                      "Empty Post!",
                      "Please enter in a valid message",
                      "warning"
                    );
                    this.setState({ newPost: "" });
                  } else {
                    this.props
                      .newPost(currentUser.user_id, trimmedPost)
                      .then(() => {
                        this.props.loginUser();
                        this.props.getEmployersPosts();
                        this.setState({ newPost: "" });
                      });
                  }
                } else {
                  this.props
                    .newPost(currentUser.user_id, this.state.newPost)
                    .then(() => {
                      this.props.loginUser();
                      this.props.getEmployersPosts();
                      this.setState({ newPost: "" });
                    });
                }
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
