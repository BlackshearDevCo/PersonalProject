import React, { Component } from "react";
import "./profile.css";

import { connect } from "react-redux";

import { enterBio, changeBio } from "../../redux/reducers/userReducer";

class Profile extends Component {
  // componentDidMount() {
  //   console.log(this.props);
  // }

  render() {
    const {
      name,
      email,
      profilePic,
      bio,
      currentUser,
      enterBio,
      changeBio,
      newBio,
      posts,
      birthdate,
      userType,
      companyName,
      city,
      state,
      country,
      experience
    } = this.props;

    return (
      <div>
        {!currentUser ? (
          <div className="profile-banner">
            <img src={profilePic} className="profile-pic" />
            <section className="user-info">
              <h2 className="user-name not-logged">
                Oops! You aren't logged in!
              </h2>
              <a href='http://localhost:3001/auth'><button>Log In</button></a>
            </section>
            <section className="posts-container">
              <h2 className="posts-title">Previous Posts</h2>
              <div className="post">Post</div>
            </section>
          </div>
        ) : (
          <div>
            <div className="profile-banner">
              <img src={profilePic} className="profile-pic" />

              <section className="user-info">
                <h2 className="user-name">{name || "Placeholder"}</h2>
                <div className="user-type">
                  <p className="info-title">User Type: </p>
                  <p className="info">Developer</p>
                </div>
                <div className="user-email">
                  <p className="info-title">Email: </p>
                  <p className="info">{email || "User has no email"}</p>
                </div>
                <div className="user-bio">
                  <p className="info-title">Bio: </p>
                  {!bio ? (
                    <div>
                      <input
                        placeholder="Enter Bio"
                        onChange={e => enterBio(e.target.value)}
                      />
                      <button
                        onClick={() => changeBio(currentUser.user_id, newBio)}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <p className="info">{bio}</p>
                  )}
                </div>
                <div className="user-experience">
                  <p className="info-title">Experience: </p>
                  {!experience ? (
                    <p className="info">User has no experience</p>
                  ) : (
                    <p>{experience}</p>
                  )}
                </div>
                <div className="user-birthday">
                  <p className="info-title">Birthday: </p>
                  {!birthdate ? (
                    <p className="info">
                      User has chosen not to show their birthday
                    </p>
                  ) : (
                    <p>{birthdate}</p>
                  )}
                </div>
                <div className="user-location">
                  <p className="info-title">Location: </p>
                  <p className="info">
                    User has chosen not to show their location
                  </p>
                </div>
              </section>

              <section className="posts-container">
                <h2 className="posts-title">Previous Posts</h2>
                <div className="post">
                  {!posts[0] ? (
                    <div>
                      <p>No Posts</p>
                    </div>
                  ) : (
                    <div>Test</div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { enterBio, changeBio })(Profile);
