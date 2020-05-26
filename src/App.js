import React from 'react';
import './App.css';
import Landing from './Components/Landing'
import User from './Components/UserTemplate'
import {
  HashRouter,
  Route
  } from 'react-router-dom'



function App() {
  return (
    <HashRouter>
    <div>
      <Route exact path='/' component={Landing}/>
      <Route  path='/user' component={User}/>
    </div>
  </HashRouter>
  );
}

export default App;
