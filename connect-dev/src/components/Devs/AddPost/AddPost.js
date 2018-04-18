import React, { Component } from "react";
import "./addPost.css";

import { connect } from "react-redux";

import { newPost, loginUser, getEmployersPosts } from "../../../redux/reducers/userReducer";

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
  // componentDidMount(){
  //     console.log(this.props)
  // }

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
    const { newPost, currentUser } = this.props;

    return (
      <div>
        {!this.state.postFlag ? (
          <div className="post-btn" onClick={() => this.togglePostFlag()} />
        ) : (
          <div>
            <div className="new-post-pontainer">
              <textarea
                className="textarea"
                onChange={e => this.createPost(e.target.value)}
              />
              <button
                className="add-post"
                onClick={() => {
                  this.props.newPost(currentUser.user_id, this.state.newPost),
                    this.props.loginUser(),
                    this.props.getEmployersPosts(),
                    this.togglePostFlag();
                }}
              >
                Add Post
              </button>
              <h3 className="character-limit">Limit 300 Characters</h3>
            </div>
            <div className="post-btn" onClick={() => this.togglePostFlag()} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { newPost, loginUser, getEmployersPosts })(AddPost);
