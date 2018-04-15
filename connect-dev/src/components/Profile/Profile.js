import React, { Component } from "react";
import './profile.css';

class Profile extends Component {
  render() {
    return (
      <div>
        <div className='profile-banner' />
        <section className='user-info'>
          <div className="profile-pic" />
            <h2 className='user-name'>Placeholder</h2>
            <p className='user-type'>User Type</p>
            <p className='user-email'>Email</p>
            <p className='user-bio'>Bio</p>
            <p className='user-experience'>Experience</p>
        </section>
        <section className='posts-container'>
            <h2 className='posts-title'>Previous Posts</h2>
            <div className='post'>Post</div>
        </section>
      </div>
    );
  }
}

export default Profile;
