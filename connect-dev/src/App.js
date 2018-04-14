import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import routes from './routes';

import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { connect } from 'react-redux';

import { getUsers } from './redux/reducers/userReducer';

class App extends Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    console.log(this.props.users);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Navbar />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUsers })(App);