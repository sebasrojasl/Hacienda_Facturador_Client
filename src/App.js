import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import GlobalState from './context/GlobalState'
import AppAppBar from './components/AppAppBar'
import Homepage from './components/Homepage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import LandPage from './components/LandPage';

class App extends Component{

  render(){
    return (
      <GlobalState>
        <AppAppBar />
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Homepage} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/LandPage" component={LandPage} />
          </Switch>
        </BrowserRouter>
      </GlobalState>
    );
  }
}

export default App;
