import React, { Component } from "react";
import "./profile.css";

import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { name, email, profilePic,bio } = this.props;

    return (
      <div>
        <div className="profile-banner">
          <img src={profilePic} className="profile-pic" />
          <section className="user-info">
            <h2 className="user-name">{name || "Placeholder"}</h2>
            <p className="info-title">User Type: </p>
            <p className="info">Developer</p>
            <p className="info-title">Email: </p>
            <p className="info">{email || "User has no email"}</p>
            <p className="info-title">Bio: </p>
            { !bio ? <input placeholder='Enter Bio' /> :<p className="info">{bio}</p> }
            <p className="info-title">Experience: </p>
            <p className="info">User has no experience</p>
          </section>
          <section className="posts-container">
            <h2 className="posts-title">Previous Posts</h2>
            <div className="post">Post</div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Profile);
