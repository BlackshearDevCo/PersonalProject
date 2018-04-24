import React, { Component } from "react";
import "./navbar.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../redux/reducers/userReducer";

class Navbar extends Component {

  render() {
    const { menuFlag, toggleMenuFlag } = this.props;

    return (
      <div className='nav'>
        {/* <Link to='/profile' onClick={() => toggleMenuFlag()}><div className={!menuFlag ? 'nav-pfp' : 'nav-pfp-hide'} /></Link> */}
          <div className={!menuFlag ? "nav-links" : "nav-true"}>
            <Link to="/" className={!menuFlag ? 'link-1' : 'link-1-active' } onClick={() => toggleMenuFlag()}>
              Home
            </Link>
            <Link to="/devs" className={!menuFlag ? 'link-2' : 'link-2-active' } onClick={() => toggleMenuFlag()}>
              Devs
            </Link>
            <Link
              to="/employers"
              className={!menuFlag ? 'link-3' : 'link-3-active' }
              onClick={() => toggleMenuFlag()}
            >
              Employers
            </Link>
            <Link
              to="/community"
              className={!menuFlag ? 'link-4' : 'link-4-active' }
              onClick={() => toggleMenuFlag()}
            >
              Community
            </Link>
            <Link
              to="/profile"
              className={!menuFlag ? 'link-5' : 'link-5-active' }
              onClick={() => toggleMenuFlag()}
            >
              Profile
            </Link>
            <Link to="/about" className={!menuFlag ? 'link-6' : 'link-6-active' } onClick={() => toggleMenuFlag()}>
              About
            </Link>
            <Link
              to="/contact"
              className={!menuFlag ? 'link-7' : 'link-7-active' }
              onClick={() => toggleMenuFlag()}
            >
              Contact
            </Link>
            {!this.props.name ? (
              <a
                href="http://localhost:3001/auth"
                className={!menuFlag ? 'link-8' : 'link-8-active' }
                onClick={() => toggleMenuFlag()}
              >
                Login
              </a>
            ) : (
              <a href='http://localhost:3000/#/'
                onClick={() => {this.props.logout(), toggleMenuFlag()}}
                className={!menuFlag ? 'link-8' : 'link-8-active' }
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

export default connect(mapStateToProps, { logout })(Navbar);
