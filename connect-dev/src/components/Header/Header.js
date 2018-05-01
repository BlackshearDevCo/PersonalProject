import React, { Component } from "react";
import "./header.css";

import Navbar from "../Navbar/Navbar";

import { Link } from "react-router-dom";
// import onClickOutside from 'react-onclickoutside';

import { connect } from "react-redux";

import {
  loginUser,
  logout,
  getConnectionCount
} from "../../redux/reducers/userReducer";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuFlag: false,
      exitFlag: false,
      mouseHover: false
    };
    this.toggleMenuFlag = this.toggleMenuFlag.bind(this);
  }

  componentDidMount() {
    this.props.currentUser && this.props.loginUser();
  }

  toggleMenuFlag() {
    this.setState({ menuFlag: !this.state.menuFlag });
  }

  render() {
    const { currentUser, name } = this.props;

    this.props.currentUser &&
      this.props.getConnectionCount(this.props.currentUser.user_id);

    return (
      <div className="header">
        <Navbar
          menuFlag={this.state.menuFlag}
          toggleMenuFlag={this.toggleMenuFlag}
        />
        <div className="header-container">
          <div
            className={!this.state.menuFlag ? "showExit" : "showExit"}
            onClick={() => this.toggleMenuFlag()}
          >
            <div className={this.state.menuFlag && "exit-one"} />
            <div className={this.state.menuFlag && "exit-two"} />
          </div>
          <div className="menu-container" onClick={() => this.toggleMenuFlag()}>
            <div
              className={
                !this.state.menuFlag ? "hamburger-menu-left" : "exit-menu-left"
              }
            />
            <div
              className={
                !this.state.menuFlag ? "hamburger-menu-mid" : "exit-menu-mid"
              }
            />
            <div
              className={
                !this.state.menuFlag
                  ? "hamburger-menu-right"
                  : "exit-menu-right"
              }
            />
          </div>
          <Link to="/" className="main-logo-link">
            <div className="main-logo" />
          </Link>
          {currentUser.profile_picture ? (
            <div
              className="header-pfp"
              onMouseEnter={() => this.setState({ mouseHover: true })}
              onMouseLeave={() => this.setState({ mouseHover: false })}
            >
              <Link to="/profile">
                <div
                  style={{
                    backgroundImage: `url(${currentUser.profile_picture})`
                  }}
                  className="header-pfp"
                />
              </Link>
              {this.state.mouseHover ? (
                <div className="header-pfp-hover-true">
                  <h3 className="header-pfp-username">
                    {currentUser.first_name}
                  </h3>
                  <p className="header-pfp-info">{currentUser.email}</p>
                  <p className="header-pfp-info">
                    {this.props.currentUserConnections.length} Connections
                  </p>
                  <a href="http://localhost:3000/#/">
                    <button
                      className="header-pfp-login"
                      onClick={() => this.props.logout()}
                    >
                      Log Out
                    </button>
                  </a>
                </div>
              ) : (
                <div className="header-pfp-hover" />
              )}
            </div>
          ) : (
            <div
              className="default-header-pfp"
              onMouseEnter={() => this.setState({ mouseHover: true })}
              onMouseLeave={() => this.setState({ mouseHover: false })}
            >
              <Link to="/profile">
                <div className="default-header-pfp" />
              </Link>
              {this.state.mouseHover ? (
                <div className="header-pfp-hover-true">
                  <h3 className="header-pfp-text">You are not logged in</h3>
                  <a href="http://localhost:3001/auth">
                    <button className="header-pfp-login">Log in</button>
                  </a>
                </div>
              ) : (
                <div className="header-pfp-hover" />
              )}
            </div>
          )}
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
  logout,
  getConnectionCount
})(Header);
