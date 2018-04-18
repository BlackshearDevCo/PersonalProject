import React, { Component } from "react";
import Footer from '../Footer/Footer';
import "./profile.css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  logout,
  loginUser,
  updateUserInfo,
  getUserPosts,
  deletePost
} from "../../redux/reducers/userReducer";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      birthday: "",
      location: "",
      userType: 0,
      userBio: "",
      userExperience: 0,
      companyName: "",
      toggleUserTypeEdit: false,
      toggleUserBioEdit: false,
      toggleExperienceEdit: false,
      toggleCompanyNameEdit: false,
      toggleUserBirthdayEdit: false,
      toggleUserLocationEdit: false
    };
    this.toggleUserTypeEdit = this.toggleUserTypeEdit.bind(this);
    this.toggleUserBioEdit = this.toggleUserBioEdit.bind(this);
    this.toggleExperienceEdit = this.toggleExperienceEdit.bind(this);
    this.toggleCompanyNameEdit = this.toggleCompanyNameEdit.bind(this);
    this.toggleUserBirthdayEdit = this.toggleUserBirthdayEdit.bind(this);
    this.toggleUserLocationEdit = this.toggleUserLocationEdit.bind(this);
  }

  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
    this.props.currentUser ? this.props.getUserPosts(this.props.currentUser.user_id) : null;
  }

  toggleUserTypeEdit() {
    this.setState({
      toggleUserTypeEdit: !this.state.toggleUserTypeEdit
    });
  }

  toggleUserBioEdit() {
    this.setState({
      toggleUserBioEdit: !this.state.toggleUserBioEdit
    });
  }

  toggleExperienceEdit() {
    this.setState({
      toggleExperienceEdit: !this.state.toggleExperienceEdit
    });
  }

  toggleCompanyNameEdit() {
    this.setState({
      toggleCompanyNameEdit: !this.state.toggleCompanyNameEdit
    });
  }

  toggleUserBirthdayEdit() {
    this.setState({
      toggleUserBirthdayEdit: !this.state.toggleUserBirthdayEdit
    });
  }

  toggleUserLocationEdit() {
    this.setState({
      toggleUserLocationEdit: !this.state.toggleUserLocationEdit
    });
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
      deletePost
    } = this.props;

    return (
      <div>
        {!name ? (
          <div className="profile-banner">
            <img src={profilePic} className="profile-pic" />
            <section className="user-info">
              <h2 className="user-name not-logged">
                Oops! You aren't logged in!
              </h2>
              <a href="http://localhost:3001/auth">
                <button>Log In</button>
              </a>
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
                <h2 className="user-name">{currentUser.first_name || "Placeholder"}</h2>
                <Link to="/">
                  <button onClick={() => logout()}>Logout</button>
                </Link>
                <div className="user-type">
                  <p className="info-title">User Type: </p>
                  {!currentUser.user_type ? (
                    <div>
                      <button onClick={() => this.setState({ userType: 1 })}>
                        Developer
                      </button>
                      <button onClick={() => this.setState({ userType: 2 })}>
                        Employer
                      </button>
                    </div>
                  ) : (
                    <div
                      className="info"
                      onDoubleClick={() => this.toggleUserTypeEdit()}
                    >
                      {!this.state.toggleUserTypeEdit ? (
                        <p>
                          {currentUser.user_type === 1
                            ? "Developer"
                            : "Employer"}
                        </p>
                      ) : (
                        <div>
                          <button
                            onClick={() => this.setState({ userType: 1 })}
                          >
                            Developer
                          </button>
                          <button
                            onClick={() => this.setState({ userType: 2 })}
                          >
                            Employer
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="user-email">
                  <p className="info-title">Email: </p>
                  <p className="info">{email || "User has no email"}</p>
                </div>
                <div className="user-bio">
                  <p className="info-title">Bio: </p>
                  <div>
                    {!bio ? (
                      <div>
                        <input
                          placeholder="Enter Bio"
                          onChange={e =>
                            this.setState({ userBio: e.target.value })
                          }
                        />
                      </div>
                    ) : (
                      <div
                        className="info"
                        onDoubleClick={() => this.toggleUserBioEdit()}
                      >
                        {!this.state.toggleUserBioEdit ? (
                          <p>{ bio }</p>
                        ) : (
                          <div>
                            <input
                              placeholder="Enter Bio"
                              onChange={e =>
                                this.setState({ userBio: e.target.value })
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="user-experience">
                  <div>
                    {currentUser.user_type === 2 ? (
                      <p className="info-title">Company Name: </p>
                    ) : (
                      <p className="info-title">Experience: </p>
                    )}
                  </div>
                  <div>
                    {currentUser.user_type === 2 ? (
                      currentUser.company_name ? (
                        <div
                          className="info"
                          onDoubleClick={() => this.toggleCompanyNameEdit()}
                        >
                          {!this.state.toggleCompanyNameEdit ? (
                            <p>{currentUser.company_name}</p>
                          ) : (
                            <div>
                              <input
                                onChange={e =>
                                  this.setState({ companyName: e.target.value })
                                }
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          onChange={e =>
                            this.setState({ companyName: e.target.value })
                          }
                        />
                      )
                    ) : !currentUser.experience ? (
                      <div>
                        <button
                          onClick={() => this.setState({ userExperience: 1 })}
                        >
                          Junior
                        </button>
                        <button
                          onClick={() => this.setState({ userExperience: 2 })}
                        >
                          Mid-Level
                        </button>
                        <button
                          onClick={() => this.setState({ userExperience: 3 })}
                        >
                          Senior
                        </button>
                      </div>
                    ) : (
                      <div>
                        {!this.state.toggleExperienceEdit ? (
                          <div>
                            {currentUser.experience === 1 ? (
                              <p
                                onDoubleClick={() =>
                                  this.toggleExperienceEdit()
                                }
                              >
                                Junior
                              </p>
                            ) : currentUser.experience === 2 ? (
                              <p
                                onDoubleClick={() =>
                                  this.toggleExperienceEdit()
                                }
                              >
                                Mid-Level
                              </p>
                            ) : (
                              <p
                                onDoubleClick={() =>
                                  this.toggleExperienceEdit()
                                }
                              >
                                Senior
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={() =>
                                this.setState({ userExperience: 1 })
                              }
                            >
                              Junior
                            </button>
                            <button
                              onClick={() =>
                                this.setState({ userExperience: 2 })
                              }
                            >
                              Mid-Level
                            </button>
                            <button
                              onClick={() =>
                                this.setState({ userExperience: 3 })
                              }
                            >
                              Senior
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="user-birthday">
                  <p className="info-title">Birthday: </p>
                  {!currentUser.birthdate ? (
                    <div>
                      <input
                        placeholder="MM/DD/YYYY"
                        onChange={e =>
                          this.setState({ birthday: e.target.value })
                        }
                      />
                    </div>
                  ) : (
                    <div
                      className="info"
                      onDoubleClick={() => this.toggleUserBirthdayEdit()}
                    >
                      {!this.state.toggleUserBirthdayEdit ? (
                        <p>{currentUser.birthdate}</p>
                      ) : (
                        <input
                          placeholder="MM/DD/YYYY"
                          onChange={e =>
                            this.setState({ birthday: e.target.value })
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="user-location">
                  <p className="info-title">Location: </p>
                  {!currentUser.location ? (
                    <div>
                      <input
                        placeholder="City, State"
                        onChange={e =>
                          this.setState({ location: e.target.value })
                        }
                      />
                    </div>
                  ) : (
                    <div
                      className="info"
                      onDoubleClick={() => this.toggleUserLocationEdit()}
                    >
                      {!this.state.toggleUserLocationEdit ? (
                        <p>{currentUser.location}</p>
                      ) : (
                        <input
                          placeholder="City, State"
                          onChange={e =>
                            this.setState({ location: e.target.value })
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
                <p>Double Click or Double Tap to edit your info.</p>
                <button
                  onClick={() => {
                    this.setState({
                      toggleUserTypeEdit: false,
                      toggleUserBioEdit: false,
                      toggleExperienceEdit: false,
                      toggleCompanyNameEdit: false,
                      toggleUserBirthdayEdit: false,
                      toggleUserLocationEdit: false
                    });
                    this.props
                      .updateUserInfo(
                        currentUser.user_id,
                        this.state.userType || currentUser.user_type,
                        this.state.birthday || currentUser.birthdate,
                        this.state.userBio || currentUser.bio,
                        this.state.userExperience || currentUser.experience,
                        this.state.location || currentUser.location,
                        this.state.companyName || currentUser.company_name
                      )
                      .then(() => this.props.loginUser());
                  }}
                >
                  Update Info
                </button>
              </section>

              <section className="posts-container">
                <h2 className="posts-title">Previous Posts</h2>
                <div className="post">
                  {!userPosts[0] ? (
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
                                <div>
                                <button onClick={() => {deletePost(cur.post_id); this.props.getUserPosts(this.props.currentUser.user_id)}}>
                                  DELETE POST
                                </button>
                                </div>
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
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, {
  logout,
  loginUser,
  updateUserInfo,
  getUserPosts,
  deletePost
})(Profile);