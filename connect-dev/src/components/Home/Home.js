import React, { Component } from "react";
import Footer from "../Footer/Footer";
import "./home.css";

import { connect } from "react-redux";

import { loginUser } from "../../redux/reducers/userReducer";

class Home extends Component {
  componentDidMount() {
    this.props.currentUser ? this.props.loginUser() : null;
  }

  render() {
    return (
      <div className="body">
        <main className="main-section">
          <div className="container">
            <h1 className="main-text">
              The number one connection site for developers
            </h1>
          </div>
          <button className="connect-button">Connect</button>
          <div className="overlay" />
        </main>

        <section className="connect">
          <div className="background-image" />
          <h1 className="connect-header">Connect</h1>
          <div className="connect-text-container">
            <p className="connect-text">
              We allow you to connect with developers from all around the world
            </p>
          </div>
          <section className='home-about'>
            <div className="devices">
              <div className="devices-image" />
              <p className="devices-text">
                View our website on any of your favorite devices
              </p>
            </div>
            <div className="career">
              <div className="career-image" />
              <p className="career-text">
                Experience a new perspective to your career
              </p>
            </div>
            <div className="team">
              <div className="team-image" />
              <p className="team-text">
                Build your perfect team from one place
              </p>
            </div>
          </section>
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { loginUser })(Home);
