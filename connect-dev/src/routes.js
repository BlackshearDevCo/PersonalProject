import React from 'react';

import { Route, Switch } from 'react-router-dom';

import About from './components/About/About';
import Community from './components/Community/Community';
import Contact from './components/Contact/Contact';
import Devs from './components/Devs/Devs';
import Employers from './components/Employers/Employers';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/devs' component={Devs} />
        <Route path='/employers' component={Employers} />
        <Route path='/community' component={Community} />
        <Route path='/profile' component={Profile} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
    </Switch>
)