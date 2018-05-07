import React, { Component } from "react";
import "./community.css";

import io from "socket.io-client";
import swal from "sweetalert";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import {
  toggleMenuFlag,
  toggleUserTypeEdit
} from "../../redux/reducers/userReducer.js";

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name || "",
      userInput: "",
      messages: [],
      user_id: this.props.userId,
      user_pic: this.props.profilePic
    };
    this.socket = io("localhost:3001");

    this.sendMessage = () => {
      this.socket.emit("SEND_MESSAGE", {
        userId: this.state.user_id,
        userPic: this.state.user_pic,
        user: this.state.username,
        message: this.state.userInput
      });
      this.setState({ userInput: "" });
    };

    this.socket.on("RECIEVE_MESSAGE", data => {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({ messages: [...this.state.messages, data] });
    };

    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    this.props.currentUser &&
      this.props.userTypeEdit &&
      this.props.toggleUserTypeEdit();
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      if (!this.state.userInput || !this.state.username) {
        swal("Message Failed!", "Please enter in a vaild Message!", "warning");
        this.setState({ userInput: "" });
      } else {
        let trimmedPost = this.state.userInput.trim();
        if (trimmedPost.length === 0) {
          swal("Empty Message!", "Please enter in a valid message", "warning");
          this.setState({ userInput: "" });
        } else {
          this.sendMessage();
        }
      }
    }
  }

  render() {
    return (
      <div onClick={() => this.props.menuFlag && this.props.toggleMenuFlag()}>
        <div className="chat">
          <div className="devs-background" />
          {this.props.currentUser.email && (
            <div>
              <section className="chat-container">
                {this.state.messages.map((cur, ind) => {
                  return (
                    <div>
                      {cur.userId === this.props.currentUser.user_id ? (
                        <div className="single-user-message-container">
                          <div className="message-pfp-border">
                            <div
                              style={{
                                backgroundImage: `url(${
                                  this.props.currentUser.profile_picture
                                })`
                              }}
                              className="message-pfp"
                            />
                          </div>
                          <div className="user-message-content-container">
                            <h3 className="user-message-username">
                              {cur.user}
                            </h3>
                            <div
                              key={ind}
                              className={
                                cur.userId === this.props.currentUser.user_id
                                  ? "user-message-container"
                                  : "message-container"
                              }
                            >
                              <p className="message-message">{cur.message}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="single-message-container">
                          <div className="message-pfp-border">
                            <Link to={`/user/${cur.userId}`}>
                              <div
                                style={{
                                  backgroundImage: `url(${cur.userPic})`
                                }}
                                className="message-pfp"
                              />
                            </Link>
                          </div>
                          <div className="message-content-container">
                            <h3 className="message-username">{cur.user}</h3>
                            <div
                              key={ind}
                              className={
                                cur.userId === this.props.currentUser.user_id
                                  ? "user-message-container"
                                  : "message-container"
                              }
                            >
                              <p className="message-message">{cur.message}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            </div>
          )}
          <div>
            {this.props.currentUser.email ? (
              <section className="community-container">
                <input
                  type="text"
                  placeholder="Enter Message Here..."
                  className="message-input"
                  value={this.state.userInput}
                  onChange={e => this.setState({ userInput: e.target.value })}
                  onKeyDown={this.handleEnter}
                />
                <button
                  onClick={() => {
                    if (!this.state.userInput || !this.state.username) {
                      swal(
                        "Message Failed!",
                        "Please enter in a vaild Message!",
                        "warning"
                      );
                      this.setState({ userInput: "" });
                    } else {
                      let trimmedPost = this.state.userInput.trim();
                      if (trimmedPost.length === 0) {
                        swal(
                          "Empty Message!",
                          "Please enter in a valid message",
                          "warning"
                        );
                        this.setState({ userInput: "" });
                      } else {
                        this.sendMessage();
                      }
                    }
                  }}
                  className="send-message"
                >
                  <div className="send-arrow" />
                </button>
              </section>
            ) : (
              <div className="community-text">
                <h3>You must log in to chat!</h3>
                <a
                  href="http://localhost:3001/auth"
                  className="login-text-a-tag"
                >
                  <p className="login-text">Login</p>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, { toggleMenuFlag, toggleUserTypeEdit })(
  Community
);
