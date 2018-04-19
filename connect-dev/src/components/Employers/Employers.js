import React, { Component } from "react";
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
      locationSearch: ""
    };
    this.handleUsernameSearch - this.handleUsernameSearch.bind(this);
    this.handleLocationSearch - this.handleLocationSearch.bind(this);
  }

  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
    this.props.getEmployersPosts();
  }

  handleUsernameSearch(val) {
    this.setState({ usernameSearch: val });
  }

  handleLocationSearch(val) {
    this.setState({ locationSearch: val });
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
              <Link to={`/user/${cur.user_id}`}>
                <h3 id={cur.user_id} className="post-username">
                  {cur.first_name}
                </h3>
              </Link>
            </div>
            <p id={cur.post_id} className="post-body">
              {cur.post_body}
            </p>
          </div>
        );
      });
    return (
      <div>
        <input
          placeholder="Username..."
          onChange={e => this.handleUsernameSearch(e.target.value)}
        />
        <input
          placeholder="Username..."
          onChange={e => this.handleLocationSearch(e.target.value)}
        />
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
