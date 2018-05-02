import React, { Component } from "react";
import "./header.css";

import Navbar from "../Navbar/Navbar";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  loginUser,
  logout,
  getConnectionCount,
  toggleUserTypeEdit,
  toggleUserPortfolioEdit,
  toggleCompanyNameEdit,
  toggleUserBioEdit,
  toggleUserLocationEdit,
  toggleExperienceEdit,
  toggleUserBirthdayEdit,
  toggleMenuFlag
} from "../../redux/reducers/userReducer";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      mouseHover: false
    };
  }

  componentDidMount() {
    this.props.currentUser && this.props.loginUser();
  }

  render() {
    const { currentUser, name, menuFlag } = this.props;

    return (
      <div className="header">
        <Navbar />
        <div className="header-container">
          <div
            className={!this.props.menuFlag ? "showExit" : "showExit"}
            onClick={() => this.props.toggleMenuFlag()}
          >
            <div className={this.props.menuFlag && "exit-one"} />
            <div className={this.props.menuFlag && "exit-two"} />
          </div>
          <div
            className={!this.props.menuFlag ? "menu-container" : "menu-container-true"}
            onClick={() => {
              this.props.toggleMenuFlag();
              this.state.mouseHover &&
                this.setState({ mouseHover: !this.state.mouseHover });
            }}
          >
            <div
              className={
                !this.props.menuFlag ? "hamburger-menu-left" : "exit-menu-left"
              }
            />
            <div
              className={
                !this.props.menuFlag ? "hamburger-menu-mid" : "exit-menu-mid"
              }
            />
            <div
              className={
                !this.props.menuFlag
                  ? "hamburger-menu-right"
                  : "exit-menu-right"
              }
            />
          </div>
          {!menuFlag ? (
            <Link to="/" className="main-logo-link">
              <div className="main-logo" />
            </Link>
          ) : (
            <Link to="/" className="main-logo-link-true">
              <div className="main-logo" />
            </Link>
          )}
          {currentUser.profile_picture ? (
            <div>
              <div
                className={
                  !this.props.menuFlag
                    ? "header-pfp-container"
                    : "header-pfp-container-true"
                }
              >
                {window.innerWidth >= 900 ? (
                  <div
                    onMouseEnter={() => {
                      this.props.currentUser &&
                        this.props.getConnectionCount(
                          this.props.currentUser.user_id
                        );
                      this.setState({ mouseHover: true });
                    }}
                    onMouseLeave={() => this.setState({ mouseHover: false })}
                  >
                    <Link to="/profile">
                      <div
                        style={{
                          backgroundImage: `url(${currentUser.profile_picture})`
                        }}
                        className={!this.props.menuFlag ? "header-pfp" : "header-pfp-true"}
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
                        <Link
                          to="/profile"
                          onClick={() => {
                            this.props.toggleUserTypeEdit();
                          }}
                        >
                          <p className="header-edit">Edit Profile</p>
                        </Link>
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
                    onClick={() => {
                      this.props.currentUser &&
                        this.props.getConnectionCount(
                          this.props.currentUser.user_id
                        );
                      this.setState({ mouseHover: !this.state.mouseHover });
                    }}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${currentUser.profile_picture})`
                      }}
                      className={!this.props.menuFlag ? "header-pfp" : "header-pfp-true"}
                    />
                    {this.state.mouseHover ? (
                      <div className="header-pfp-hover-true">
                        <h3 className="header-pfp-username">
                          {currentUser.first_name}
                        </h3>
                        <p className="header-pfp-info">{currentUser.email}</p>
                        <p className="header-pfp-info">
                          {this.props.currentUserConnections.length} Connections
                        </p>
                        <Link
                          to="/profile"
                          onClick={() => {
                            this.props.toggleUserTypeEdit();
                          }}
                        >
                          <p className="header-edit">Edit Profile</p>
                        </Link>
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
                )}
              </div>
            </div>
          ) : (
            <div>
              {window.innerWidth >= 900 ? (
                <div
                  className={
                    !this.props.menuFlag
                      ? "default-header-pfp"
                      : "default-header-pfp-true"
                  }
                  onMouseEnter={() => this.setState({ mouseHover: true })}
                  onMouseLeave={() => this.setState({ mouseHover: false })}
                >
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
              ) : (
                <div
                  className={
                    !this.props.menuFlag
                      ? "default-header-pfp"
                      : "default-header-pfp-true"
                  }
                  onClick={() =>
                    this.setState({ mouseHover: !this.state.mouseHover })
                  }
                >
                  {this.state.mouseHover === true ? (
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
            // </div>
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
  getConnectionCount,
  toggleUserTypeEdit,
  toggleUserPortfolioEdit,
  toggleCompanyNameEdit,
  toggleUserBioEdit,
  toggleUserLocationEdit,
  toggleExperienceEdit,
  toggleUserBirthdayEdit,
  toggleMenuFlag
})(Header);
