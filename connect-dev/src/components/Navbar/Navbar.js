import React, { Component } from "react";
import "./navbar.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../redux/reducers/userReducer";

class Navbar extends Component {
  constructor() {
    super();
    // this.state = {
    //   menuFlag: false
    // }
  }

  render() {
    const { menuFlag, toggleMenuFlag } = this.props;

    let logInOut = () => {
      if (!this.props.currentUser) {
        return (
          <button>
            <a href="http://localhost:3001/auth">LOGIN</a>
          </button>
        );
      } else if (this.props.currentUser) {
        return (
          <button>
            <a onClick={() => this.props.logout()}>LOGOUT</a>
          </button>
        );
      }
    };

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
            <Link to="/employers" className="link" onClick={() => toggleMenuFlag()}>
              Employers
            </Link>
            <Link to="/community" className="link" onClick={() => toggleMenuFlag()}>
              Community
            </Link>
            <Link to="/profile" className="link" onClick={() => toggleMenuFlag()}>
              Profile
            </Link>
            <Link to="/about" className="link" onClick={() => toggleMenuFlag()}>
              About
            </Link>
            <Link to="/contact" className="link" onClick={() => toggleMenuFlag()}>
              Contact
            </Link>
          </div>
          <div
            className={!menuFlag ? "slide-down" : "slide-down slide-down-true"}
          />
          <div className={!menuFlag ? "slide-up" : "slide-up slide-up-true"} />
        </div>
        <div className="login">
          {!this.props.currentUser ? (
            <button>
              <a href="http://localhost:3001/auth">LOGIN</a>
            </button>
          ) : null}
          {this.props.currentUser ? (
            <button>
              <a onClick={() => this.props.logout()}>LOGOUT</a>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { logout })(Navbar);
