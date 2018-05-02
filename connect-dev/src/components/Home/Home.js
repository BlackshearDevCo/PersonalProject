import React, { Component } from "react";
import Footer from "../Footer/Footer";
import "./home.css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  loginUser,
  getConnectionCount
} from "../../redux/reducers/userReducer";

class Home extends Component {
  componentDidMount() {
    this.props.currentUser && this.props.loginUser();
  }

  render() {
    return (
      <div className={this.props.menuFlag ? "body-slide" : "body"}>
        <main className="main-section">
          <div className="container">
            <h1 className="main-text">
              The number one connection site for developers
            </h1>
          </div>
          {this.props.currentUser.length === 0 ? (
            <a href="http://localhost:3001/auth">
              <button className="connect-button">Connect</button>
            </a>
          ) : this.props.currentUser.user_type === 1 ? (
            <Link to="/employers">
              <button className="connect-button">Connect</button>
            </Link>
          ) : (
            <Link to="/devs">
              <button className="connect-button">Connect</button>
            </Link>
          )}
          <div className="overlay" />
          <div className="color-overlay" />
        </main>

        <div className="connect-container">
          <section className="connect">
            <section className="home-about">
              <div className="devices">
                <div className="devices-image" />
                <p className="devices-text">
                  View our website on any of your favorite devices
                </p>
              </div>
              <div className="connect-click">
                <div className="connect-click-image" />
                <p className="connect-click-text">
                  Connect with any user at the click of a button
                </p>
              </div>
              <div className="home-community">
                <div className="home-community-image" />
                <p className="home-community-text">
                  Talk to the entire developer community with ease
                </p>
              </div>
              <div className="home-get-connected">
                <p className="home-get-connected-text">
                  What are you wating for?
                </p>
                <p className="home-get-connected-text">Go get Connected!</p>
              </div>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { loginUser, getConnectionCount })(
  Home
);
