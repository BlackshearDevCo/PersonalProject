import React from 'react';

import { Route, Switch } from 'react-router-dom';

import About from './components/About/About';
import Community from './components/Community/Community';
import Contact from './components/Contact/Contact';
import Devs from './components/Devs/Devs';
import Employers from './components/Employers/Employers';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import CompleteProfile from './components/CompleteProfile/CompleteProfile';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/devs' component={Devs} />
        <Route exact path='/employers' component={Employers} />
        <Route exact path='/community' component={Community} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/complete-profile' component={CompleteProfile} />
    </Switch>
)