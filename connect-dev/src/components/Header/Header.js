import React, { Component } from "react";
import "./header.css";

import Navbar from "../Navbar/Navbar";

import { connect } from "react-redux";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuFlag: false,
      exitFlag: false
    };
    this.toggleMenuFlag = this.toggleMenuFlag.bind(this);
  }

  toggleMenuFlag() {
    this.setState({ menuFlag: !this.state.menuFlag });
  }

  render() {
    const { name, email, profilePic } = this.props;

    return (
      <div className="header">
        <Navbar menuFlag={this.state.menuFlag} toggleMenuFlag={this.toggleMenuFlag} />
        {/* <div className="header-container"> */}
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
        <img src={profilePic} alt="" className="pfp-container" />
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(Header);
