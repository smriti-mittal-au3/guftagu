import React from 'react';
import Signup from './Signup';
import './App.scss';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={Signup}></Route>
        {/* <Route path='/policy' component={Policy}></Route> */}
      </BrowserRouter>
    
    </div>
  );
}

export default App;
