import React, { Component } from "react";
import "./community.css";

import io from "socket.io-client";
import swal from "sweetalert";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

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
      console.log(data);
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({ messages: [...this.state.messages, data] });
    };

    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      if (!this.state.userInput || !this.state.username) {
        swal("Message Failed!", "Please enter in a vaild Message!", "warning");
      } else {
        this.sendMessage();
      }
    }
  }

  render() {
    const { username, userInput, messages } = this.state;
    return (
      <div>
        <div className="chat">
          <div className="devs-background" />
          <div>
            <section className="chat-container">
              {this.state.messages.map((cur, ind) => {
                return (
                  <div>
                    {cur.userId == this.props.currentUser.user_id ? (
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
                        <div className="message-content-container">
                          <h3 className="user-message-username">{cur.user}</h3>
                          <div
                            key={ind}
                            className={
                              cur.userId == this.props.currentUser.user_id
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
                              cur.userId == this.props.currentUser.user_id
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
          <div>
            {this.props.currentUser ? (
              <section className="community-container">
                <input
                  type="text"
                  placeholder="Message"
                  className="message-input"
                  value={this.state.userInput}
                  onChange={e => this.setState({ userInput: e.target.value })}
                  onKeyDown={this.handleEnter}
                />
                <button
                  onClick={
                    !this.state.userInput || !this.state.username
                      ? () =>
                          swal(
                            "Message Failed!",
                            "Please enter in a vaild Message!",
                            "warning"
                          )
                      : this.sendMessage
                  }
                  className="send-message"
                >
                  <div className="send-arrow" />
                </button>
              </section>
            ) : (
              <h3 className="community-text">You must sign in to chat!</h3>
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

export default connect(mapStateToProps)(Community);
