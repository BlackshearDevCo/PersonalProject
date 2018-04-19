import React, { Component } from "react";
import "./devs.css";
import AddPost from "./AddPost/AddPost";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { getPosts, loginUser } from "../../redux/reducers/userReducer";

class Devs extends Component {
  constructor() {
    super();
    this.state = {
      usernameSearch: "",
      locationSearch: "",
      experienceSearch: ""
    };
    this.handleUsernameSearch = this.handleUsernameSearch.bind(this);
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
    this.handleExperienceSearch = this.handleExperienceSearch.bind(this);
    // this.handleSearch =this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
    this.props.getPosts();
  }

  handleUsernameSearch(val) {
    this.setState({ usernameSearch: val });
  }

  handleLocationSearch(val) {
    this.setState({ locationSearch: val });
  }

  handleExperienceSearch(val) {
    this.setState({ experienceSearch: val });
  }

  // handleSearch() {
  //   console.log(this.state.usernameSearch)
  //   console.log(this.state.locationSearch)
  //   console.log(this.state.experienceSearch)
  // }

  render() {
    let filtered = this.props.posts
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
            <p>{cur.location}</p>
          </div>
          <p id={cur.post_id} className="post-body">
            {cur.post_body}
          </p>
        </div>
      );
    })
    return (
      <div>
        <section className="search-container">
          <input
            placeholder="Username..."
            onChange={e => this.handleUsernameSearch(e.target.value)}
          />
          <input
            placeholder="Location..."
            onChange={e => this.handleLocationSearch(e.target.value)}
          />
          {/* <input onChange={e => this.handleExperienceSearch(e.target.value)} /> */}
          {/* <button onClick={() => this.handleSearch()} >Search</button> */}
        </section>

        {this.props.posts && this.props.posts.length > 0 ? (
          <div>
          {filtered}
          {!filtered.length && <div>No posts match your filter</div>}
          </div>
        ) : (
          <h1>No Posts</h1>
        )}
        <div>
          {this.props.currentUser && this.props.currentUser.user_type === 1 ? (
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

export default connect(mapStateToProps, { getPosts, loginUser })(Devs);
