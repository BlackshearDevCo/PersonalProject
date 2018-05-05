import React, { Component } from "react";
import "./contact.css";

import { connect } from 'react-redux';
import { toggleUserTypeEdit } from '../../redux/reducers/userReducer';

class Contact extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    (this.props.currentUser && this.props.userTypeEdit) && this.props.toggleUserTypeEdit();
  }

  render(){
    return (
      <div>
        <div className="devs-background" />
        <div className="contact-container">
          <h1 className="contact-header">Contact ConnectDev</h1>
          <div className="contact-bg">
            <section className="main-contact">
              <p className="phone">
                Feel free to get in contact with us to give us your feedback! Call
                us between 9:00am - 7:00pm (CDT) at (555)-555-5555
              </p>
              <p className="email">
                You can also email us at ablackshear7820@gmail.com with any
                feedback you have!
              </p>
            </section>
          </div>
          <p className="appreciate">
            We appreciate all of your feedback and answer every call and email
            personally, not with an automatic message. We hope this shows how much
            we care about you!
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state }
};

export default connect(mapStateToProps, { toggleUserTypeEdit })(Contact)