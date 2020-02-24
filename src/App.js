import React from 'react';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import './App.scss';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import reducer from './reducer/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Route exact path='/' component={Signup}></Route>
          <Route path="/login" component={Login}></Route>
          {/* <Route path='/policy' component={Policy}></Route> */}
          {sessionStorage.getItem('login')? <Route path='/home' component={Home}></Route>:<Redirect to='/'></Redirect>}
        </BrowserRouter>
      
      </div>
    </Provider>
  );
}

export default App;

