import React, { Component } from "react";
import "./viewprofile.css";

import swal from "sweetalert";

import { connect } from "react-redux";

import {
  getAllUsers,
  loginUser,
  getUserPosts,
  connectWithUser,
  sendUserNotification,
  getConnectionCount,
  sendEmail,
  toggleMenuFlag,
  toggleUserTypeEdit
} from "../../redux/reducers/userReducer";

class ViewProfile extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.currentUser && this.props.loginUser();
    this.props.getUserPosts(this.props.match.params.id);
    this.props.getAllUsers(this.props.match.params.id);
    this.props.getConnectionCount(this.props.match.params.id);
    this.props.currentUser &&
      this.props.userTypeEdit &&
      this.props.toggleUserTypeEdit();
  }

  render() {
    const {
      profilePic,
      currentUser,
      userPosts = [],
      users,
      currentUserConnections,
      connectWithUser,
      sendUserNotification,
      getConnectionCount,
      sendEmail
    } = this.props;

    let viewUserProfile = users.map((cur, ind) => {
      return (
        <div key={ind}>
          <div className="profile-banner loading-banner">
            <div className="devs-background" />
            <img src={cur.profile_picture} className="profile-pic" />
            <h2 className="user-name">{cur.first_name || "Username"}</h2>
            {currentUser.user_id &&
              currentUser.user_id !== cur.user_id && (
                <button
                  className="user-connect"
                  onClick={() => {
                    connectWithUser(currentUser.user_id, cur.user_id).then(() =>
                      getConnectionCount(cur.user_id)
                    );
                    sendUserNotification(cur.user_id);
                    sendEmail(
                      cur.email,
                      cur.first_name,
                      currentUser.user_id,
                      currentUser.email,
                      currentUser.first_name,
                      currentUser.location,
                      currentUser.portfolio
                    );
                    swal(
                      "Awesome!",
                      `You connected with ${cur.first_name}!`,
                      "success"
                    );
                  }}
                >
                  Connect
                </button>
              )}

            <div className="profile-border">
              <section className="user-info">
                <div className="user-type">
                  <p className="info-title">User Type: </p>
                  <p className="info">
                    {cur.user_type === 1 ? "Developer" : "Employer"}
                  </p>
                </div>
                <div className="user-email">
                  <p className="info-title">Email: </p>
                  <p
                    className="info info-email"
                    onClick={() =>
                      window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=${cur.email}`
                      )
                    }
                  >
                    {cur.email || "User has no email"}
                  </p>
                </div>
                <div>
                  <p className="info-title">Connections: </p>
                  <p className="info">
                    {currentUserConnections
                      ? currentUserConnections.length
                      : "0"}
                  </p>
                </div>
                {cur.user_type === 1 && (
                  <div className="user-port">
                    <p className="info-title">Portfolio: </p>
                    <p className="info">
                      {cur.portfolio ? (
                        <div
                          className="user-port"
                          onClick={() => {
                            window.open(`${cur.portfolio}`);
                          }}
                        >
                          {cur.portfolio}
                        </div>
                      ) : (
                        "User does not have a portfolio"
                      )}
                    </p>
                  </div>
                )}
                <div className="user-bio">
                  <p className="info-title">Bio: </p>
                  <p className="info">{cur.bio || "User has no bio"}</p>
                </div>
                <div className="user-experience">
                  {cur.user_type === 1 ? (
                    <p className="info-title">Experience: </p>
                  ) : (
                    <p className="info-title">Company: </p>
                  )}
                  <div className="info">
                    {cur.user_type === 1 ? (
                      <div>
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
                    ) : (
                      <div>
                        {cur.company_name || "Company does not have a name"}
                      </div>
                    )}
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
            </div>
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
                            <h3 id={cur.user_id} className="post-username">
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
    });

    return (
      <div onClick={() => this.props.menuFlag && this.props.toggleMenuFlag()}>
        {this.props.isLoading ? (
          <div className="loading-bg">
            <div className="loading-color-bg">
              <div className="loading-container">
                <div className="circle circle-1" />
                <div className="circle circle-2" />
                <div className="circle circle-3" />
                <div className="circle circle-4" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {users ? (
              <div className="profile-banner">
                <div className="devs-background" />
                {viewUserProfile}
              </div>
            ) : (
              <div>
                <div className="profile-banner">
                  <div className="devs-background" />
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
  sendUserNotification,
  getConnectionCount,
  sendEmail,
  toggleMenuFlag,
  toggleUserTypeEdit
})(ViewProfile);
