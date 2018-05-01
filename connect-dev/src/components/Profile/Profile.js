import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "./profile.css";
import swal from "sweetalert";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  logout,
  loginUser,
  updateUserInfo,
  getUserPosts,
  deletePost,
  getConnectionCount,
  getNotifications,
  toggleUserTypeEdit,
  toggleUserPortfolioEdit,
  toggleUserBioEdit,
  toggleExperienceEdit,
  toggleCompanyNameEdit,
  toggleUserBirthdayEdit,
  toggleUserLocationEdit
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
      userPortfolio: "",
      userBio: "",
      // userCompanyName: '',
      userBirthday: "",
      userLocation: "",
      usernameSearch: "",
      locationSearch: "",
      errorMessage: ""
    };
    this.handleLocation - this.handleLocation.bind(this);
    this.handleError - this.handleError.bind(this);
  }

  componentDidMount() {
    this.props.currentUser && this.props.loginUser();
    this.props.currentUser &&
      this.props.getUserPosts(this.props.currentUser.user_id);
    this.props.currentUser &&
      this.props.getConnectionCount(this.props.currentUser.user_id);
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
console.log(window.innerWidth)
    return (
      <div>
        {!name ? (
          <div className="profile-banner">
            <img src={profilePic} className="default-profile-pic" />
            <section className="user-info">
              <h2 className="not-logged">Oops! You aren't logged in!</h2>
              <a href="http://localhost:3001/auth">
                <button className="profile-log-in">Log In</button>
              </a>
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
                      // onDoubleClick={() => this.props.toggleUserTypeEdit()}
                    >
                      {!this.props.userTypeEdit ? (
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
                      ? currentUserConnections.length
                      : "0"}
                  </p>
                </div>
                {!this.props.userPortfolioEdit
                  ? currentUser.user_type == 1 && (
                      <div
                        className="user-link"
                        // onDoubleClick={() => this.props.toggleUserPortfolioEdit()}
                      >
                        <p className="info-title">Portfolio: </p>
                        <p className="info">
                          {currentUser.portfolio
                            ? (
                                <a
                                  href={currentUser.portfolio}
                                  className="user-port"
                                >
                                  {currentUser.portfolio}
                                </a>
                              ) || <p>User does not have a portfolio.</p>
                            : "User does not have a portfolio."}
                        </p>
                      </div>
                    )
                  : currentUser.user_type == 1 && (
                      <div
                        className="user-link"
                        // onDoubleClick={() => this.props.toggleUserPortfolioEdit()}
                      >
                        <p className="info-title">Portfolio: </p>
                        <input
                          placeholder={currentUser.portfolio || "Portfolio"}
                          onChange={e =>
                            this.setState({ userPortfolio: e.target.value })
                          }
                        />
                      </div>
                    )}
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
                        // onDoubleClick={() => this.props.toggleUserBioEdit()}
                      >
                        {!this.props.userBioEdit ? (
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
                      <p className="info-title">Company: </p>
                    ) : (
                      <p className="info-title">Experience: </p>
                    )}
                  </div>
                  <div>
                    {currentUser.user_type === 2 ? (
                      currentUser.company_name ? (
                        <div
                          className="info"
                          // onDoubleClick={() => this.props.toggleCompanyNameEdit()}
                        >
                          {!this.props.userCompanyNameEdit ? (
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
                        {!this.props.userExperienceEdit ? (
                          <div
                          // onDoubleClick={() => this.props.toggleExperienceEdit()}
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
                          // onDoubleClick={() => this.props.toggleExperienceEdit()}
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
                      // onDoubleClick={() => this.props.toggleUserBirthdayEdit()}
                    >
                      {!this.props.userBirthdayEdit ? (
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
                      {!this.props.userLocationEdit ? (
                        <p
                        // onDoubleClick={() => this.props.toggleUserLocationEdit()}
                        >
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
                            <div className="profile-location-container">
                              <input
                                {...getInputProps({
                                  placeholder: currentUser.location || 'Search Location...',
                                  className:
                                    "location search-input profile-location"
                                })}
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
                        <div className="profile-location-container">
                          <input
                            {...getInputProps({
                              placeholder: "Search Location...",
                              className: "location search-input"
                            })}
                          />
                          <div className="autocomplete-dropdown-container autocomplete-dropdown-container-profile">
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
                <div className="button-container">
                  <button
                    className="update-info-btn"
                    onClick={() => {
                      swal(
                        "Update Successful",
                        "Your profile was updated",
                        "success",
                        { button: "Nice!" }
                      );
                      this.props.userTypeEdit &&
                        this.props.toggleUserTypeEdit();
                      this.props
                        .updateUserInfo(
                          currentUser.user_id,
                          this.state.userType || currentUser.user_type,
                          this.state.birthday || currentUser.birthdate,
                          this.state.userBio || currentUser.bio,
                          this.state.userExperience || currentUser.experience,
                          this.state.locationSearch || currentUser.location,
                          this.state.companyName || currentUser.company_name,
                          this.state.toggleUserPortfolioEdit ||
                            currentUser.portfolio
                        )
                        .then(() => this.props.loginUser());
                    }}
                  >
                    Update Info
                  </button>
                  <Link to="/" className="log-out-btn">
                    <button
                      className="profile-log-out"
                      onClick={() => logout()}
                    >
                      Logout
                    </button>
                  </Link>
                </div>
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
                                  className="delete-post"
                                  onClick={() => {
                                    swal(
                                      "Delete Successful",
                                      "Your post was deleted",
                                      "success",
                                      { button: "Nice!" }
                                    );
                                    deletePost(cur.post_id);
                                    this.props.getUserPosts(
                                      this.props.currentUser.user_id
                                    );
                                  }}
                                >
                                  DELETE
                                </button>
                              </div>
                            </div>
                            <p id={cur.post_id} className="post-body">
                              {cur.post_body}
                            </p>
                            {cur.user_type === 1 && (
                              <p className="post-experience">
                                {cur.experience === 1
                                  ? "Junior "
                                  : cur.experience === 2
                                    ? "Mid-Level "
                                    : "Senior "}
                                Dev
                              </p>
                            )}
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
  getConnectionCount,
  getNotifications,
  toggleUserTypeEdit,
  toggleUserPortfolioEdit,
  toggleUserBioEdit,
  toggleExperienceEdit,
  toggleCompanyNameEdit,
  toggleUserBirthdayEdit,
  toggleUserLocationEdit
})(Profile);
