import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "../Devs/devs.css";
import AddPost from "../Devs/AddPost/AddPost";
import swal from "sweetalert";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  getEmployersPosts,
  loginUser,
  getConnectionCount,
  toggleMenuFlag,
  toggleUserTypeEdit,
  deletePost
} from "../../redux/reducers/userReducer";

class Devs extends Component {
  constructor() {
    super();
    this.state = {
      usernameSearch: "",
      locationSearch: "",
      errorMessage: "",
      mouseHover: false,
      postInd: 0
    };
    this.handleUsernameSearch = this.handleUsernameSearch.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  componentDidMount() {
    this.props.currentUser && this.props.loginUser();
    this.props.getEmployersPosts();
    this.props.currentUser &&
      this.props.userTypeEdit &&
      this.props.toggleUserTypeEdit();
  }

  handleLocation(address) {
    this.setState({ locationSearch: address });
  }

  handleError(err) {
    this.setState({ errorMessage: `GOOGLE LOCATION ERROR: ${err}` });
  }

  handleUsernameSearch(val) {
    this.setState({ usernameSearch: val });
  }

  handleMouseHover() {
    this.setState({ mouseHover: !this.state.mouseHover });
  }

  render() {
    let filtered = this.props.employerPosts
      .filter(
        cur =>
        cur.first_name.toLowerCase().includes(this.state.usernameSearch.toLowerCase()) &&
        cur.location.toLowerCase().includes(this.state.locationSearch.toLowerCase())
      )
      .map((cur, ind) => {
        return (
          <div>
            <div key={ind} className="post-container">
              <div className="user-container">
                <Link to={`/user/${cur.user_id}`}>
                  <img
                    src={cur.profile_picture}
                    className="post-pfp"
                    onMouseEnter={() => {
                      this.handleMouseHover();
                      this.props.getConnectionCount(cur.user_id);
                      this.setState({ postInd: ind });
                    }}
                    onMouseLeave={() => {
                      this.handleMouseHover();
                    }}
                  />
                </Link>
                <div className="name-container">
                  <Link
                    to={`/user/${cur.user_id}`}
                    className="post-username-link"
                  >
                    <h3
                      id={cur.user_id}
                      className="post-username"
                      onMouseEnter={() => {
                        this.handleMouseHover();
                        this.props.getConnectionCount(cur.user_id);
                        this.setState({ postInd: ind });
                      }}
                      onMouseLeave={() => {
                        this.handleMouseHover();
                      }}
                    >
                      {cur.first_name}
                    </h3>
                  </Link>
                  <p className="post-location">{cur.location}</p>
                </div>
                <div>
                  {(this.props.currentUser.user_id === cur.user_id ||
                    this.props.currentUser.user_id === 8) && (
                    <button
                      className="delete-post"
                      onClick={() => {
                        swal(
                          "Delete Successful",
                          "Your post was deleted",
                          "success",
                          { button: "Nice!" }
                        );
                        this.props.deletePost(cur.post_id).then(() => {
                          this.props.getEmployersPosts();
                        });
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <p id={cur.post_id} className="post-body">
                {cur.post_body}
              </p>
            </div>
            {this.state.postInd === ind ? (
              <div
                className={
                  this.state.mouseHover ? "show-quick-look" : "hide-quick-look"
                }
              >
                <div className="quick-look-bg">
                  <div className="quick-look-container">
                    <img src={cur.profile_picture} className="post-pfp" />
                    <h3 className="quick-look-name">{cur.first_name}</h3>
                    <p className="quick-look-location">
                      {cur.location ||
                        "User has chosen not to share their location"}
                    </p>
                    <div className="quick-look-email">
                      <p className="quick-look-info-title">Email: </p>
                      <p className="quick-look-info">
                        {cur.email || "User does not have an email"}
                      </p>
                    </div>
                    <div className="quick-look-connections">
                      <p className="quick-look-info-title">Connections: </p>
                      <p className="quick-look-info">
                        {this.props.currentUserConnections.length || "0"}
                      </p>
                    </div>
                    <div className="quick-look-bio">
                      <p className="quick-look-info-title">Bio: </p>
                      <p className="quick-look-info">
                        {cur.bio || "User does not have a bio"}
                      </p>
                    </div>
                    <div>
                      {cur.user_type === 1 ? (
                        <div className="quick-look-experience">
                          <p className="quick-look-info-title">Experience: </p>
                          <p className="quick-look-info">
                            {cur.experience === 1
                              ? "Junior Dev"
                              : cur.experience === 2
                                ? "Mid-Level Dev"
                                : "Senior Dev"}
                          </p>
                        </div>
                      ) : (
                        <div className="quick-look-company">
                          <p className="quick-look-info-title">
                            Company Name:{" "}
                          </p>
                          <p className="quick-look-info">{cur.company_name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={
                  this.state.mouseHover ? "show-quick-look" : "hide-quick-look"
                }
              />
            )}
          </div>
        );
      });
    return (
      <div
        className="devs-container"
        onClick={() => this.props.menuFlag && this.props.toggleMenuFlag()}
      >
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
            <div className="devs-background" />
            <div
              className="back-to-top"
              onClick={() => {
                window.scroll({ top: 0, behavior: "smooth" });
              }}
            />
            <div className="input-container">
              <input
                placeholder="Search By Username..."
                onChange={e => this.handleUsernameSearch(e.target.value)}
                className="username search-input"
              />
              <PlacesAutocomplete
                value={this.state.locationSearch}
                onChange={value => this.handleLocation(value)}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div className="location-container">
                    <input
                      {...getInputProps({
                        placeholder: "Search By Location...",
                        className: "location search-input"
                      })}
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
            </div>
            {this.props.employerPosts && this.props.employerPosts.length > 0 ? (
              <div>
                {filtered}
                {!filtered.length && (
                  <h1 className="no-posts">No posts match your search</h1>
                )}
              </div>
            ) : (
              <h1 className="no-posts">No Posts</h1>
            )}
            <div>
              {this.props.currentUser &&
                this.props.currentUser.user_type === 2 && (
                  <div>
                    <AddPost className="small" />
                  </div>
                )}
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
  getEmployersPosts,
  loginUser,
  getConnectionCount,
  toggleMenuFlag,
  toggleUserTypeEdit,
  deletePost
})(Devs);
