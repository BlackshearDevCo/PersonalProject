import React, { Component } from "react";
import "./community.css";

import io from "socket.io-client";
import swal from 'sweetalert';

import { connect } from "react-redux";

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name || "",
      userInput: "",
      messages: []
    };
    this.socket = io("localhost:3001");

    this.sendMessage = () => {
      // ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
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

  handleEnter(event) {
    if (event.keyCode === 13) {
      if (!this.state.userInput || !this.state.username) {
        swal("Message Failed!", "Please enter in a vaild Message!", 'warning')
      } else {
        this.sendMessage()
      }
    }
  }

  render() {
    const { username, userInput, messages } = this.state;
    return (
      <div>
        <div className="chat">
          <div className="background" />
          <div>
            <section className="chat-container">
              {this.state.messages.map((cur, ind) => {
                return (
                  <div key={ind} className="message-container">
                    <h3 className="message-username">
                      {cur.user}:{" "}
                      <span className="message-message">{cur.message}</span>
                    </h3>
                  </div>
                );
              })}
            </section>
          </div>
          <div>
            {this.props.name ? (
              <section className="community-container">
                <br />
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
                      ? () => swal("Message Failed!", "Please enter in a vaild Message!", 'warning')
                      : this.sendMessage
                  }
                  className="send-message"
                >
                  Send
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
