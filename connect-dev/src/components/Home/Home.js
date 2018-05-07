import React, { Component } from "react";
import "./home.css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  loginUser,
  getConnectionCount,
  toggleMenuFlag,
  toggleUserTypeEdit
} from "../../redux/reducers/userReducer";

class Home extends Component {
  componentDidMount() {
    this.props.currentUser && this.props.loginUser();
    this.props.currentUser &&
      this.props.userTypeEdit &&
      this.props.toggleUserTypeEdit();
      window.scroll({ top: 0, behavior: "smooth" });
  }

  render() {
    return (
      <div>
        <div
          className="back-to-top"
          onClick={() => {
            window.scroll({ top: 0, behavior: "smooth" });
          }}
        />
        <div
          className={this.props.menuFlag ? "body-slide" : "body"}
          onClick={() => this.props.menuFlag && this.props.toggleMenuFlag()}
        >
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
                  {this.props.currentUser.length === 0 ? (
                    <p className="home-get-connected-text">
                      Go get
                      <a
                        href="http://localhost:3001/auth"
                        className="home-get-connected-text highlight"
                      >
                        {" "}
                        Connected!
                      </a>
                    </p>
                  ) : (
                    <div>
                      {this.props.currentUser.user_type === 1 ? (
                        <p className="home-get-connected-text">
                          Go get<Link
                            to="/employers"
                            className="home-get-connected-text highlight"
                          >
                            {" "}
                            Connected
                          </Link>
                        </p>
                      ) : (
                        <p className="home-get-connected-text">
                          Go get<Link
                            to="/devs"
                            className="home-get-connected-text highlight"
                          >
                            {" "}
                            Connected
                          </Link>
                        </p>
                      )}
                    </div>
                  )}
                  {/* <button className='back-to-top' onClick={() => window.scroll({top: 0, behavior: "smooth"})}>TEST</button> */}
                </div>
              </section>
            </section>
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
  loginUser,
  getConnectionCount,
  toggleMenuFlag,
  toggleUserTypeEdit
})(Home);
