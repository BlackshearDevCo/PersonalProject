import React, { Component } from "react";

import { connect } from "react-redux";

import { getAllUsers, loginUser, getUserPosts } from "../../redux/reducers/userReducer";

class ViewProfile extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
    this.props.users ? this.props.getUserPosts(this.props.users.user_id) : null;
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
      userPosts,
      users,
      getUserPosts,
      userType,
      experience,
      birthdate,
      location
    } = this.props;
console.log(this.props);
    return (
      <div>
        {users ? (
          users.map((cur, ind) => {
            console.log(cur);
            return (
              <div key={ind}>
                <div className="profile-banner">
                  <img src={cur.profile_picture} className="profile-pic" />

                  <section className="user-info">
                    <h2 className="user-name">
                      {cur.first_name || "Username"}
                    </h2>
                    <div className="user-type">
                      <p className="info-title">User Type: </p>
                      <p className="info">{cur.use_type || "Developer"}</p>
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
            );
          })
        ) : (
          <div>
            <div className="profile-banner">
              <img src={profilePic} className="profile-pic" />

              <section className="user-info">
                <h2 className="user-name">{name || "Username"}</h2>
                <div className="user-type">
                  <p className="info-title">User Type: </p>
                  <p className="info">{userType || "Developer"}</p>
                </div>
                <div className="user-email">
                  <p className="info-title">Email: </p>
                  <p className="info">{email || "User has no email"}</p>
                </div>
                <div className="user-bio">
                  <p className="info-title">Bio: </p>
                  <p className="info">{bio || "User has no bio"}</p>
                </div>
                <div className="user-experience">
                  <p className="info-title">Experience: </p>
                  <p className="info">
                    {experience || "User has no experience"}
                  </p>
                </div>
                <div className="user-birthday">
                  <p className="info-title">Birthday: </p>
                  <p className="info">
                    {birthdate || "User has chosen not to show their birthday"}
                  </p>
                </div>
                <div className="user-location">
                  <p className="info-title">Location: </p>
                  {/* <p className="info">
                    {location || "User has chosen not to show their location"}
                  </p> */}
                </div>
              </section>

              <section className="posts-container">
                <h2 className="posts-title">Previous Posts</h2>
                <div className="post">
                  {!userPosts ? (
                    <div>
                      <p>No Posts</p>
                    </div>
                  ) : (
                    <div>
                      {
                        userPosts.map((cur, ind) => {
                          return (
                            <div key={ind} className="post-container">
                              <div className="user-container">
                                <img src={cur.profile_picture} className="post-pfp" />
                                <h3 id={cur.user_id} className="post-username">
                                  {cur.first_name}
                                </h3>
                              </div>
                              <p id={cur.post_id} className="post-body">
                                {cur.post_body}
                              </p>
                            </div>
                          )
                        })
                      }
                    </div>
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

const mapStateToProp = state => {
  return { ...state };
};

export default connect(mapStateToProp, { getAllUsers, loginUser, getUserPosts })(ViewProfile);