import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Footer from "../Footer/Footer";
import "./profile.css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  logout,
  loginUser,
  updateUserInfo,
  getUserPosts,
  deletePost,
  getConnectionCount
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
      toggleUserLocationEdit: false,
      usernameSearch: "",
      locationSearch: "",
      errorMessage: ""
    };
    this.toggleUserTypeEdit = this.toggleUserTypeEdit.bind(this);
    this.toggleUserBioEdit = this.toggleUserBioEdit.bind(this);
    this.toggleExperienceEdit = this.toggleExperienceEdit.bind(this);
    this.toggleCompanyNameEdit = this.toggleCompanyNameEdit.bind(this);
    this.toggleUserBirthdayEdit = this.toggleUserBirthdayEdit.bind(this);
    this.toggleUserLocationEdit = this.toggleUserLocationEdit.bind(this);
    this.handleLocation - this.handleLocation.bind(this);
    this.handleError - this.handleError.bind(this);
  }

  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
    this.props.currentUser &&
      this.props.getUserPosts(this.props.currentUser.user_id);
    this.props.currentUser &&
      this.props.getConnectionCount(this.props.currentUser.user_id);
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
      toggleUserLocationEdit: !this.state.toggleUserLocationEdit,
      locationSearch: this.props.currentUser.location || ""
    });
  }

  handleLocation(address) {
    this.setState({ locationSearch: address });
  }

  handleError(err) {
    this.setState({ errorMessage: `GOOGLE LOCATION ERROR: ${err}` });
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
      deletePost,
      currentUserConnections
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
                <h2 className="user-name">
                  {currentUser.first_name || "Placeholder"}
                </h2>
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
                            className={
                              currentUser.user_type === 1
                                ? "profile-active profile-button"
                                : "profile-inactive profile-button"
                            }
                          >
                            Developer
                          </button>
                          <button
                            onClick={() => this.setState({ userType: 2 })}
                            className={
                              currentUser.user_type === 2
                                ? "profile-active profile-button"
                                : "profile-inactive profile-button"
                            }
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
                <div>
                  <p className="info-title">Connections: </p>
                  <p className="info">
                    {currentUserConnections[0]
                      ? currentUserConnections[0].count
                      : "0"}
                  </p>
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
                          <p>{bio}</p>
                        ) : (
                          <div>
                            <input
                              placeholder={currentUser.bio || "Enter Bio"}
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
                                placeholder={
                                  currentUser.company_name ||
                                  "Enter Company Name"
                                }
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
                          <div
                            onDoubleClick={() => this.toggleExperienceEdit()}
                          >
                            {currentUser.experience === 1 ? (
                              <p>Junior</p>
                            ) : currentUser.experience === 2 ? (
                              <p>Mid-Level</p>
                            ) : (
                              <p>Senior</p>
                            )}
                          </div>
                        ) : (
                          <div
                            onDoubleClick={() => this.toggleExperienceEdit()}
                          >
                            <button
                              onClick={() =>
                                this.setState({ userExperience: 1 })
                              }
                              className={
                                currentUser.experience === 1
                                  ? "profile-active profile-button"
                                  : "profile-inactive profile-button"
                              }
                            >
                              Junior
                            </button>
                            <button
                              onClick={() =>
                                this.setState({ userExperience: 2 })
                              }
                              className={
                                currentUser.experience === 2
                                  ? "profile-active profile-button"
                                  : "profile-inactive profile-button"
                              }
                            >
                              Mid-Level
                            </button>
                            <button
                              onClick={() =>
                                this.setState({ userExperience: 3 })
                              }
                              className={
                                currentUser.experience === 3
                                  ? "profile-active profile-button"
                                  : "profile-inactive profile-button"
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
                          placeholder={currentUser.birthdate || "MM/DD/YYYY"}
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
                  {currentUser.location ? (
                    <div>
                      {!this.state.toggleUserLocationEdit ? (
                        <p onDoubleClick={() => this.toggleUserLocationEdit()}>
                          {currentUser.location}
                        </p>
                      ) : (
                        <PlacesAutocomplete
                          value={this.state.locationSearch}
                          onChange={value => this.handleLocation(value)}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps
                          }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: "Search Location...",
                                  className: "location search-input"
                                })}
                                onDoubleClick={() =>
                                  this.toggleUserLocationEdit()
                                }
                              />
                              <div className="autocomplete-dropdown-container">
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  const style = suggestion.active
                                    ? { backgroundColor: "#f3f3f3" }
                                    : { backgroundColor: "#ffffff" };

                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      )}
                    </div>
                  ) : (
                    <PlacesAutocomplete
                      value={this.state.locationSearch}
                      onChange={value => this.handleLocation(value)}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "Search Location...",
                              className: "location search-input"
                            })}
                            onDoubleClick={() => this.toggleUserLocationEdit()}
                          />
                          <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              const style = suggestion.active
                                ? { backgroundColor: "#fafafa" }
                                : { backgroundColor: "#ffffff" };

                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
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
                        this.state.locationSearch || currentUser.location,
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
                              <div>
                                <button
                                  onClick={() => {
                                    deletePost(cur.post_id);
                                    this.props.getUserPosts(
                                      this.props.currentUser.user_id
                                    );
                                  }}
                                >
                                  DELETE POST
                                </button>
                              </div>
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
  deletePost,
  getConnectionCount
})(Profile);
