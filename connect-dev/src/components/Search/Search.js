import React, { Component } from "react";
import "./search.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getUsers, toggleUserTypeEdit } from "../../redux/reducers/userReducer";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    };
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.currentUser &&
      this.props.userTypeEdit &&
      this.props.toggleUserTypeEdit();
  }

  render() {
    const { allUsers } = this.props;

    let users = allUsers
      .filter(e => e.first_name.toLowerCase().includes(this.state.userInput.toLowerCase()))
      .map(cur => (
        <Link to={`/user/${cur.user_id}`} className='search-info-container search-link'>
          <div className="search-user-container">
            {cur.profile_picture ? (
              <div className="search-pfp-border">
                <div
                  style={{ backgroundImage: `url(${cur.profile_picture})` }}
                  className="search-pfp"
                />
              </div>
            ) : (
              <div className="default-search-pfp" />
            )}
            <div className="search-info">
              <Link to={`/user/${cur.user_id}`} className="search-link">
                <h3 className="search-username">{cur.first_name}</h3>
              </Link>
              <p className="search-location">{cur.location || "Earth"}</p>
            </div>
          </div>
        </Link>
      ));

    return (
      <div className="search-bg">
        <div className="devs-background" />
        {/* {!this.props.isLoading ? (
          <div>
            <input
              placeholder="Search Username..."
              onChange={e => this.setState({ userInput: e.target.value })}
              className="username-search"
            />
            <div className="search-container">{users}</div>
          </div>
        ) : (
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
        )} */}
        <input
          placeholder="Search Username..."
          onChange={e => this.setState({ userInput: e.target.value })}
          className="username-search"
        />
        <div className="search-container">{users}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { getUsers, toggleUserTypeEdit })(
  Search
);
