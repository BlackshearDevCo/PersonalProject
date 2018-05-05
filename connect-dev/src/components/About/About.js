import React, { Component } from "react";
import "./about.css";

import { connect } from 'react-redux';
import { toggleUserTypeEdit } from '../../redux/reducers/userReducer';

class About extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    (this.props.currentUser && this.props.userTypeEdit) && this.props.toggleUserTypeEdit();
  }

  render() {
    return (
      <div>
        <div className="about-bg" />
        <div className="devs-background" />
        <div className="about-container">
          <div className="section-bg">
            <section className="about-section">
              <h3 className="section-title">About ConnectDev</h3>
              <p className="section-text">
                ConnectDev is connection site, created specifically for
                developers. We specialize in helping developers of all
                experience get hired and find work. Luckily, we also get to help
                out tech businesses of all sizes find the perfect developer they
                have been searching for! We believe that the whole process of
                finding employers or employees shouldn't be so stressful. That's
                where we come in!
              </p>
            </section>
          </div>
          <div className="section-bg">
            <section className="about-section">
              <h3 className="section-title">Our Goal</h3>
              <p className="section-text">
                Our main goal here at ConnectDev is to help connect the
                developer community. We encourage everyone to join our site and
                talk with others. Whether you just heard about what a computer
                is, or you have been in the industry for 50 years. We want all
                developers to have success in their career. We will always be
                here to help all of our users find the perfect job!
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state }
};

export default connect(mapStateToProps, { toggleUserTypeEdit })(About);
