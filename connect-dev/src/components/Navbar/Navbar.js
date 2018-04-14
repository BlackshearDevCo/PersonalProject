import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from '../../redux/reducers/userReducer';

class Navbar extends Component {
  
  render() {
    let logInOut = () => {
      if (!this.props.currentUser) {
        return <button><a href="http://localhost:3001/auth">LOGIN</a></button>;
      }
      else if(this.props.currentUser){
        return <button><a onClick={() => this.props.logout()}>LOGOUT</a></button>;
      }
    };
    console.log(this.props.currentUser);
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/devs">Devs</Link>
        <Link to="/employers">Employers</Link>
        <Link to="/community">Community</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        { !this.props.currentUser ? <button><a href="http://localhost:3001/auth">LOGIN</a></button> : null }
        { this.props.currentUser ? <button><a onClick={() => this.props.logout()}>LOGOUT</a></button> : null }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logout })(Navbar);