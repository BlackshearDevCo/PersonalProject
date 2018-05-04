import React, { Component } from "react";
import "./App.css";

import routes from "./routes";

import Header from "./components/Header/Header";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loginUser } from "./redux/reducers/userReducer";

class App extends Component {
  componentDidMount() {
    this.props.loginUser();
  }

  render() {
    return (
      <div className="App">
        <Header />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default withRouter(
  connect(mapStateToProps, { loginUser })(App)
);
