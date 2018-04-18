import React, { Component } from "react";
import "./header.css";

import Navbar from "../Navbar/Navbar";

import { Link } from 'react-router-dom';

import { connect } from "react-redux";

import { loginUser } from '../../redux/reducers/userReducer';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuFlag: false,
      exitFlag: false
    };
    this.toggleMenuFlag = this.toggleMenuFlag.bind(this);
  }

  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
  }

  toggleMenuFlag() {
    this.setState({ menuFlag: !this.state.menuFlag });
  }

  render() {
    const { currentUser, name } = this.props;

    return (
      <div className="header">
        <Navbar
          menuFlag={this.state.menuFlag}
          toggleMenuFlag={this.toggleMenuFlag}
        />
        <div
          className={!this.state.menuFlag ? null : "showExit"}
          onClick={() => this.toggleMenuFlag()}
        >
          <div className={!this.state.menuFlag ? null : "exit-one"} />
          <div className={!this.state.menuFlag ? null : "exit-two"} />
        </div>
        <div className="menu-container" onClick={() => this.toggleMenuFlag()}>
          <div className="top-menu" />
          <div className="mid-menu" />
          <div className="bottom-menu" />
        </div>
        <div className="main-logo" />
        <div>
          {name ? (
            <Link to='/profile'>
            <img
              src={currentUser.profile_picture}
              alt=""
              className="pfp-container"
            />
            </Link>
          ) : (
            <Link to='/profile'>
            <div className="pfp-container" />
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {...state}
};

export default connect(mapStateToProps, { loginUser })(Header);