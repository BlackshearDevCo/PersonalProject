import React, { Component } from "react";

import { connect } from "react-redux";

import { getAllUsers } from '../../redux/reducers/userReducer';

class ViewProfile extends Component {
    constructor(){
        super()
    }

    componentDidMount() {
        this.props.getAllUsers(this.props.match.params.id);
    }

  render() {
    const {
      users,
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

    console.log(this.props.match.params.id, users);

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
                      <p className="info">
                        {cur.experience || "User has no experience"}
                      </p>
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
                        {birthdate ||
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
                  <p className="info">
                    {birthdate || "User has chosen not to show their location"}
                  </p>
                </div>
              </section>

              <section className="posts-container">
                <h2 className="posts-title">Previous Posts</h2>
                <div className="post">
                  {!posts ? (
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

const mapStateToProp = state => {
  return { ...state };
};

export default connect(mapStateToProp, { getAllUsers })(ViewProfile);
