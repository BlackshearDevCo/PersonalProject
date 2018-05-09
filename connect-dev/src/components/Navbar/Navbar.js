import React, { Component } from "react";
import "./navbar.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout, toggleMenuFlag } from "../../redux/reducers/userReducer";

class Navbar extends Component {
  render() {
    const { menuFlag } = this.props;

    return (
      <div className={menuFlag ? 'nav-true' : 'nav'}>
        <div className="nav-pfp">
          {!this.props.currentUser.first_name ? (
            <div className="default-nav-pfp" />
          ) : (
            <Link to={`/user/${this.props.currentUser.user_id}`} onClick={() => this.props.toggleMenuFlag()}>
            <div
              className="user-nav-pfp"
              style={{backgroundImage: `url(${this.props.currentUser.profile_picture})`}}
            />
            </Link>
          )}
        </div>
        <div className={!menuFlag ? "nav-links" : "nav-links-true"}>
          <Link
            to="/"
            className={!menuFlag ? "link link-1" : "link link-1-active"}
            onClick={() => this.props.toggleMenuFlag()}
          >
            Home
          </Link>
          <Link
            to="/devs"
            className={!menuFlag ? "link link-2" : "link link-2-active"}
            onClick={() => this.props.toggleMenuFlag()}
          >
            Devs
          </Link>
          <Link
            to="/employers"
            className={!menuFlag ? "link link-3" : "link link-3-active"}
            onClick={() => this.props.toggleMenuFlag()}
          >
            Employers
          </Link>
          <Link
            to="/community"
            className={!menuFlag ? "link link-4" : "link link-4-active"}
            onClick={() => this.props.toggleMenuFlag()}
          >
            Community
          </Link>
          <Link
            to="/search"
            className={!menuFlag ? "link link-20" : "link link-20-active"}
            onClick={() => this.props.toggleMenuFlag()}
          >
            Search
          </Link>
          <Link
            to="/profile"
            className={!menuFlag ? "link link-5" : "link link-5-active"}
            onClick={() => this.props.toggleMenuFlag()}
          >
            Profile
          </Link>
          <Link
            to="/about"
            className={!menuFlag ? "link link-6" : "link link-6-active"}
            onClick={() => this.props.toggleMenuFlag()}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={!menuFlag ? "link link-7" : "link link-7-active"}
            onClick={() => this.props.toggleMenuFlag()}
          >
            Contact
          </Link>
          {!this.props.name ? (
            <a
              href="http://localhost:3001/auth"
              className={!menuFlag ? "link link-8" : "link link-8-active"}
              onClick={() => this.props.toggleMenuFlag()}
            >
              Login
            </a>
          ) : (
            <a
              href="http://localhost:3000"
              onClick={() => {
                this.props.logout(), this.props.toggleMenuFlag();
              }}
              className={!menuFlag ? "link link-8" : "link link-8-active"}
            >
              Logout
            </a>
          )}
        </div>
        <div className={!menuFlag ? "shrink" : "grow"} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { logout, toggleMenuFlag })(Navbar);
