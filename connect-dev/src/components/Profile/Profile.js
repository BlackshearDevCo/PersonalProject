import React, { Component } from "react";
import "./profile.css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  logout,
  loginUser,
  updateUserInfo
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
      companyName: ""
    };
    // this.handleUserInfo = this.handleUserInfo.bind(this);
  }

  componentDidMount() {
    this.props.loginUser();
  }

  // handleUserInfo() {
  //   this.props.updateUserInfo(
  //     currentUser.user_id,
  //     this.state.user_type || currentUser.user_type,
  //     this.state.birthday || currentUser.birthdate,
  //     this.state.userBio || currentUser.bio,
  //     this.state.experience || currentUser.experience,
  //     this.state.location || currentUser.location
  //   );
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
      experience,
      logout,
      chooseUserExperience,
      enterBirthdate
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
                <h2 className="user-name">{name || "Placeholder"}</h2>
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
                    <p className="info">
                      {currentUser.user_type === 1 ? "Developer" : "Employer"}
                    </p>
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
                      <p className="info">{bio}</p>
                    )}
                  </div>
                </div>
                <div className="user-experience">
                <div>
                  {
                    currentUser.user_type === 2 ?
                    <p className="info-title">Company Name: </p>
                    :
                    <p className="info-title">Experience: </p>
                  }
                  </div>
                  <div>
                    {
                      currentUser.user_type === 2 ?
                      (
                        currentUser.company_name ?
                        (
                          <p className='info'>{currentUser.company_name}</p>
                        )
                        :
                        (
                          <input onChange={e => this.setState({companyName: e.target.value})} />
                        )
                      )
                      :
                      (
                        !currentUser.experience ? (
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
                            {currentUser.experience === 1 ? (
                              <p>Junior</p>
                            ) : currentUser.experience === 2 ? (
                              <p>Mid-Level</p>
                            ) : (
                              <p>Senior</p>
                            )}
                          </div>
                        )
                      )
                    }
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
                    <p className="info">{currentUser.birthdate}</p>
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
                    <p className="info">{currentUser.location}</p>
                  )}
                </div>
                <button
                  onClick={() => {
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
  return state;
};

export default connect(mapStateToProps, {
  logout,
  loginUser,
  updateUserInfo
})(Profile);

// {!bio ? (
//   <div>
//     <input
//       placeholder="Enter Bio"
//       onChange={e =>
//         this.setState({ userBio: e.target.value })
//       }
//     />
//   </div>
// ) : (
//   <p className="info">{bio}</p>
// )}
