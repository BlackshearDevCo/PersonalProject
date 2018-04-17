import React, { Component } from "react";
import "./profile.css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  enterBio,
  changeBio,
  logout,
  chooseUserType,
  chooseUserExperience,
  enterBirthdate,
  loginUser
} from "../../redux/reducers/userReducer";

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      birthday: ''
    }
  }

  componentDidMount() {
    // this.props.loginUser()
  }

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
    console.log(birthdate);
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
                      <button
                        onClick={() => chooseUserType(1, currentUser.user_id)}
                      >
                        Developer
                      </button>
                      <button
                        onClick={() => chooseUserType(2, currentUser.user_id)}
                      >
                        Employer
                      </button>
                    </div>
                  ) : (
                    <p className="info">
                      {userType === 1 ? "Developer" : "Employer"}
                    </p>
                  )}
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
                  {!currentUser.experience ? (
                    <div>
                      <button
                        onClick={() =>
                          chooseUserExperience(1, currentUser.user_id)
                        }
                      >
                        Junior
                      </button>
                      <button
                        onClick={() =>
                          chooseUserExperience(2, currentUser.user_id)
                        }
                      >
                        Mid-Level
                      </button>
                      <button
                        onClick={() =>
                          chooseUserExperience(3, currentUser.user_id)
                        }
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
                  )}
                </div>
                <div className="user-birthday">
                  <p className="info-title">Birthday: </p>
                  {!birthdate ? (
                    <div>
                    <input placeholder="MM/DD/YYYY" onChange={e => this.setState({birthday: e.target.value})} />
                    <button onClick={() => enterBirthdate(currentUser.user_id, this.state.birthday)}>Submit</button>
                    </div>
                  ) : (
                    <p className="info">{birthdate || currentUser.birthdate}</p>
                  )}
                </div>
                <div className="user-location">
                  <p className="info-title">Location: </p>
                  {!currentUser.location ? (
                    <input placeholder="City, State" />
                  ) : (
                    <p className="info">{currentUser.location}</p>
                  )}
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
  return state;
};

export default connect(mapStateToProps, {
  enterBio,
  changeBio,
  logout,
  chooseUserType,
  chooseUserExperience,
  enterBirthdate,
  loginUser
})(Profile);
