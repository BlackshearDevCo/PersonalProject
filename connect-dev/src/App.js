import React, { Component } from 'react';
import './App.css';

import routes from './routes';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUsers } from './redux/reducers/userReducer';

class App extends Component {

  componentDidMount() {
    this.props.getUsers();
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

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUsers })(App));