import React,{useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import LoginLayout from "App.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={(props) => <LoginLayout {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
