import React, { Component } from "react";
import "./header.css";

import Navbar from "../Navbar/Navbar";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuFlag: false,
      exitFlag: false
    };
  }

  render() {
    return (
      <div className="header">
        <Navbar menuFlag={this.state.menuFlag} />
        <div className="header-container">
          <div
            className={!this.state.menuFlag ? null : "showExit"}
            onClick={() =>
              this.setState({
                exitFlag: !this.state.exitFlag,
                menuFlag: !this.state.menuFlag
              })
            }
          >
            <div className="exit-one" />
            <div className="exit-two" />
          </div>
          <div
            className="menu-container"
            onClick={() => this.setState({ menuFlag: !this.state.menuFlag })}
          >
            <div className="top-menu" />
            <div className="mid-menu" />
            <div className="bottom-menu" />
          </div>
          <div className="main-logo" />
        </div>
      </div>
    );
  }
}

export default Header;
