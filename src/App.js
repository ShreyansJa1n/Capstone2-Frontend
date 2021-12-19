import React,{useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import '/home/mayuri/Capstone2-Frontend/src/assets/css/App.css';
import '/home/mayuri/Capstone2-Frontend/src/assets/css/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useToken from '/home/mayuri/Capstone2-Frontend/src/useToken.js';
import Login from "./components/Login/login.component.js";
import SignUp from "./components/Login/signup.component.js";

function setToken(userToken){
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken(){
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const {token,setToken} = useToken();

  if(!token){
  	return <Login setToken={setToken}/>
  }
  return (
  <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/login"}>positronX.io</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
