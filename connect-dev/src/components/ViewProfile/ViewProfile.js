import React, { Component } from "react";
import './viewprofile.css'

import { connect } from "react-redux";

import {
  getAllUsers,
  loginUser,
  getUserPosts,
  connectWithUser,
  sendUserNotification
} from "../../redux/reducers/userReducer";

class ViewProfile extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
    this.props.getUserPosts(this.props.match.params.id);
    this.props.getAllUsers(this.props.match.params.id);
  }

  render() {
    const {
      name,
      email,
      profilePic,
      bio,
      currentUser,
      posts,
      logout,
      userPosts = [],
      users,
      getUserPosts,
      userType,
      experience,
      birthdate,
      location,
      connectWithUser,
      sendUserNotification
    } = this.props;

    return (
      <div>
        {users ? (
          users.map((cur, ind) => {
            return (
              <div key={ind}>
                <div className="profile-banner">
                  <img src={cur.profile_picture} className="profile-pic" />

                  <section className="user-info">
                    <h2 className="user-name">
                      {cur.first_name || "Username"}
                    </h2>
                    {currentUser.user_id &&
                    currentUser.user_id !== cur.user_id ? (
                      <button
                      className='user-connect'
                        onClick={() =>
                          {connectWithUser(currentUser.user_id, cur.user_id);
                          sendUserNotification(cur.user_id)}
                        }
                      >
                        Connect
                      </button>
                    ) : null}
                    <div className="user-type">
                      <p className="info-title">User Type: </p>
                      <p className="info">
                        {cur.user_type === 1 ? "Developer" : "Employer"}
                      </p>
                    </div>
                    <div className="user-email">
                      <p className="info-title">Email: </p>
                      <p className="info">{cur.email || "User has no email"}</p>
                    </div>
                    <div className="user-bio">
                      <p className="info-title">Bio: </p>
                      <p className="info">{cur.bio || "User has no bio"}</p>
                    </div>
                    <div className="user-experience">
                      <p className="info-title">Experience: </p>
                      <div className="info">
                        {(
                          <div>
                            {cur.experience === 3 ? (
                              <p>Senior</p>
                            ) : cur.experience === 2 ? (
                              <p>Mid-Level</p>
                            ) : (
                              <p>Junior</p>
                            )}
                          </div>
                        ) || "User has no experience"}
                      </div>
                    </div>
                    <div className="user-birthday">
                      <p className="info-title">Birthday: </p>
                      <p className="info">
                        {cur.birthdate ||
                          "User has chosen not to show their birthday"}
                      </p>
                    </div>
                    <div className="user-location">
                      <p className="info-title">Location: </p>
                      <p className="info">
                        {cur.location ||
                          "User has chosen not to show their location"}
                      </p>
                    </div>
                  </section>

                  <section className="posts-container">
                    <h2 className="posts-title">Previous Posts</h2>
                    <div className="post">
                      {!userPosts.length ? (
                        <div>
                          <p>No Posts</p>
                        </div>
                      ) : (
                        <div>
                          {userPosts.map((cur, ind) => {
                            return (
                              <div key={ind} className="post-container">
                                <div className="user-container">
                                  <img
                                    src={cur.profile_picture}
                                    className="post-pfp"
                                  />
                                  <h3
                                    id={cur.user_id}
                                    className="post-username"
                                  >
                                    {cur.first_name}
                                  </h3>
                                </div>
                                <p id={cur.post_id} className="post-body">
                                  {cur.post_body}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="profile-banner">
              <img src={profilePic} className="profile-pic" />

              <section className="user-info">
                <h2 className="user-name">{"Username"}</h2>
                <div className="user-type">
                  <p className="info-title">User Type: </p>
                  <p className="info">{"Developer"}</p>
                </div>
                <div className="user-email">
                  <p className="info-title">Email: </p>
                  <p className="info">{"User has no email"}</p>
                </div>
                <div className="user-bio">
                  <p className="info-title">Bio: </p>
                  <p className="info">{"User has no bio"}</p>
                </div>
                <div className="user-experience">
                  <p className="info-title">Experience: </p>
                  <p className="info">{"User has no experience"}</p>
                </div>
                <div className="user-birthday">
                  <p className="info-title">Birthday: </p>
                  <p className="info">
                    {"User has chosen not to show their birthday"}
                  </p>
                </div>
                <div className="user-location">
                  <p className="info-title">Location: </p>
                  <p className="info">
                    {"User has chosen not to show their location"}
                  </p>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProp = state => {
  return { ...state };
};

export default connect(mapStateToProp, {
  getAllUsers,
  loginUser,
  getUserPosts,
  connectWithUser,
  sendUserNotification
})(ViewProfile);
