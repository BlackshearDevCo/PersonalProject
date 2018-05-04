import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "./devs.css";
import AddPost from "./AddPost/AddPost";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  getPosts,
  loginUser,
  getConnectionCount,
  toggleMenuFlag
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
    this.props.currentUser ? this.props.loginUser() : null;
    this.props.getPosts();
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
    let filtered = this.props.posts
      .filter(
        cur =>
          cur.first_name.includes(this.state.usernameSearch) &&
          cur.location.includes(this.state.locationSearch)
      )
      .map((cur, ind) => {
        return (
          <div>
            <div key={ind} className="post-container">
              <div className="user-container">
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
                <div className="name-container">
                  <Link to={`/user/${cur.user_id}`}>
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
              </div>
              <p id={cur.post_id} className="post-body">
                {cur.post_body}
              </p>
              <p className="post-experience">
                {cur.experience === 1
                  ? "Junior "
                  : cur.experience === 2
                    ? "Mid-Level "
                    : "Senior "}
                Dev
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
                    <div className="quick-look-user-container">
                      <img src={cur.profile_picture} className="post-pfp" />
                      <div className="quick-look-name-container">
                        <h3 className="quick-look-name">{cur.first_name}</h3>
                        <p className="quick-look-location">
                          {cur.location ||
                            "User has chosen not to share their location"}
                        </p>
                      </div>
                    </div>
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
                      <p className="quick-look-info-bio">
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
console.log(this.props)
    return (
      <div className="devs-container" onClick={() => this.props.menuFlag && this.props.toggleMenuFlag()}>
        {this.props.isLoading ? (
          <div className="loading-bg">
            <div className="loading-container">
              <div className="circle circle-1" />
              <div className="circle circle-2" />
              <div className="circle circle-3" />
              <div className="circle circle-4" />
            </div>
          </div>
        ) : (
          <div>
            <div className="input-container">
              <input
                placeholder="Username..."
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
                        placeholder: "Location...",
                        className: "location search-input"
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        const style = suggestion.active
                          ? { backgroundColor: "rgb(200, 200, 200)" }
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
            {this.props.posts && this.props.posts.length > 0 ? (
              <div className="devs-posts-container">
                {filtered}
                {!filtered.length && (
                  <h1 className="no-posts">No posts match your search</h1>
                )}
                <div className="devs-background" />
              </div>
            ) : (
              <div className="devs-container">
                <div className="devs-background" />
                <h1 className="devs-loading">Loading...</h1>
              </div>
            )}
            <div>
              {this.props.currentUser &&
                this.props.currentUser.user_type === 1 && (
                  <div>
                    <AddPost className="small" />
                    <AddPost className="large" />
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
  getPosts,
  loginUser,
  getConnectionCount,
  toggleMenuFlag
})(Devs);