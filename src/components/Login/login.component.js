import React, { useState} from "react";
import PropTypes from 'prop-types';

import '../../assets/css/App.css';
import {Link} from "react-router-dom";

async function loginUser(credentials) {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login({setToken})  {
        const [username, setUserName] = useState();
        const [password, setPassword] = useState();

        const handleSubmit = async e => {
            e.preventDefault();
            const token = await loginUser({
              username,
              password
            });
            setToken(token);
        }

        
        return (
            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="text" className="form-control"  id="username" onChange={e => setUserName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"  id="password" onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <Link to="/admin/index">
                <button type="submit" id="submit" className="btn btn-primary btn-block">Submit</button></Link>
                <p className="forgot-password text-right">
                    <a href="#">Forgot password?</a>
                </p>
            </form>
        );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
