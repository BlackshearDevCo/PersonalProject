import React, { Component } from "react";
import Footer from "../Footer/Footer";
import io from "socket.io-client";

import "./community.css";

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };
  }

  render() {
    const { username, userInput, messages } = this.state;
    return (
      <div>
        <div className='chat'>
          <div className="chat-container">
            <section>
              {this.state.messages.map((cur, ind) => {
                return (
                  <div key={ind}>
                    {cur.user}: {cur.message}
                  </div>
                );
              })}
            </section>
          </div>
          <section className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
              className="username-input"
            />
            <br />
            <input
              type="text"
              placeholder="Message"
              className="message-input"
              value={this.state.userInput}
              onChange={e => this.setState({ userInput: e.target.value })}
            />
            <button onClick={this.sendMessage} className="send-message">
              Send
            </button>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Community;
