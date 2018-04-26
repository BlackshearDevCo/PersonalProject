import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "../Devs/devs.css";
import AddPost from "../Devs/AddPost/AddPost";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { getEmployersPosts, loginUser } from "../../redux/reducers/userReducer";

class Devs extends Component {
  constructor() {
    super();
    this.state = {
      usernameSearch: "",
      locationSearch: "",
      errorMessage: ""
    };
    this.handleUsernameSearch = this.handleUsernameSearch.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
    this.props.getEmployersPosts();
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

  render() {
    let filtered = this.props.employerPosts
      .filter(
        cur =>
          cur.first_name.includes(this.state.usernameSearch) &&
          cur.location.includes(this.state.locationSearch)
      )
      .map((cur, ind) => {
        return (
          <div key={ind} className="post-container">
            <div className="user-container">
              <img src={cur.profile_picture} className="post-pfp" />
              <div className="name-container">
                <Link to={`/user/${cur.user_id}`}>
                  <h3 id={cur.user_id} className="post-username">
                    {cur.first_name}
                  </h3>
                </Link>
                <p>{cur.location}</p>
              </div>
            </div>
            <p id={cur.post_id} className="post-body">
              {cur.post_body}
            </p>
          </div>
        );
      });
    return (
      <div>
        <div className="background" />
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
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Location...",
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
            {!filtered.length && <h1>No posts match your search</h1>}
          </div>
        ) : (
          <h1>No Posts</h1>
        )}
        <div>
          {this.props.currentUser && this.props.currentUser.user_type === 2 ? (
            <AddPost />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { getEmployersPosts, loginUser })(Devs);
