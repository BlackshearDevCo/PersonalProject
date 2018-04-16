import React, { Component } from "react";
import Footer from "../Footer/Footer";
import "./home.css";

import { connect } from "react-redux";

import { loginUser } from "../../redux/reducers/userReducer";

class Home extends Component {
  // constructor(props){
  //   super(props)
  // }

  componentDidMount() {
    this.props.loginUser();
  }

  render() {
    return (
      <div className="body">
        <main className="main-section">
          <div className="container">
            <h1 className="main-text">
              The number one job site for developers
            </h1>
          </div>
          <div className="overlay" />
        </main>

        <section className="slideshow">
          <div className="image-one" />
          <div className="image-two" />
          <div className="image-three" />
        </section>

        <section className="cards">
          <div className="connect">
            <div className="card-image image-connect" />
            <h2 className="card-title">Connect</h2>
            <p className="card-text">
              We help you connect with all kinds of developers from all around
              the world!
            </p>
          </div>
          <div className="satisfaction">
            <div className="card-image image-satisfaction" />
            <h2 className="card-title">Satisfaction</h2>
            <p className="card-text">
              Our top priority is your satisfaction and happiness! We are always
              open to feedback on how to make your experince a one-of-a-kind!
            </p>
          </div>
          <div className="technologies">
            <div className="card-image image-tech" />
            <h2 className="card-title">Technologies</h2>
            <p className="card-text">
              Choose from developers that know the technologies that you need
              for your new website!
            </p>
          </div>
        </section>
        <section className="our-goal">
          <div className="our-goal-img" />
          <p className="our-goal-text">
            Our main goal here at ConnectDev is to make the whole process of
            finding employers or employees a whole lot easier. Unlike other
            companies, ConnectDev specializes in web development. We help all
            developers out, no matter how much experince you have!
          </p>
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps, { loginUser })(Home);
