import React, { Component } from "react";
import "./navbar.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../redux/reducers/userReducer";

class Navbar extends Component {

  render() {
    const { menuFlag, toggleMenuFlag } = this.props;

    return (
      <div>
        <div className="nav">
          <div className={!menuFlag ? "nav-links" : "nav-links nav-true"}>
            <Link to="/" className="link" onClick={() => toggleMenuFlag()}>
              Home
            </Link>
            <Link to="/devs" className="link" onClick={() => toggleMenuFlag()}>
              Devs
            </Link>
            <Link
              to="/employers"
              className="link"
              onClick={() => toggleMenuFlag()}
            >
              Employers
            </Link>
            <Link
              to="/community"
              className="link"
              onClick={() => toggleMenuFlag()}
            >
              Community
            </Link>
            <Link
              to="/profile"
              className="link"
              onClick={() => toggleMenuFlag()}
            >
              Profile
            </Link>
            <Link to="/about" className="link" onClick={() => toggleMenuFlag()}>
              About
            </Link>
            <Link
              to="/contact"
              className="link"
              onClick={() => toggleMenuFlag()}
            >
              Contact
            </Link>
            {!this.props.name ? (
              <a
                href="http://localhost:3001/auth"
                className="link"
                onClick={() => toggleMenuFlag()}
              >
                Login
              </a>
            ) : (
              <a href='http://localhost:3000/#/'
                onClick={() => {this.props.logout(), toggleMenuFlag()}}
                className="link"
              >
                Logout
              </a>
            )}
          </div>
          <div
            className={!menuFlag ? "slide-down" : "slide-down slide-down-true"}
          />
          <div className={!menuFlag ? "slide-up" : "slide-up slide-up-true"} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { logout })(Navbar);
