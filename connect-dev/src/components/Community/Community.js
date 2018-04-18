import React, { Component } from "react";
import Footer from "../Footer/Footer";
import "./community.css";

import io from "socket.io-client";

import { connect } from 'react-redux';

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name || "",
      userInput: "",
      messages: []
    };
    this.socket = io("localhost:3001");

    this.sendMessage = ev => {
      ev.preventDefault();
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
  }

  render() {
    const { username, userInput, messages } = this.state;
    return (
      <div>
        <div className="chat">
          <div className="chat-container">
            <section>
              {this.state.messages.map((cur, ind) => {
                console.log(this.props);
                return (
                  <div key={ind}>
                    {cur.user}: {cur.message}
                  </div>
                );
              })}
            </section>
          </div>
          <section className="input-container">
            <div>
              {this.props.name ? (
                <div>
                  <h3>{this.props.name}</h3>
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                  className="username-input"
                />
              )}
            </div>
            <br />
            <input
              type="text"
              placeholder="Message"
              className="message-input"
              value={this.state.userInput}
              onChange={e => this.setState({ userInput: e.target.value })}
            />
            <button
              onClick={
                !this.state.userInput || !this.state.username
                  ? () => alert("Please enter in a vaild Username and Message!")
                  : this.sendMessage
              }
              className="send-message"
            >
              Send
            </button>
          </section>
        </div>
        <Footer />
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