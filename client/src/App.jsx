import React, { Component } from "react";
import { useState, useEffect } from "react";

//sidebar css
import "./App.css";

//install react-router-dom
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

//user context usestate
import { UserContext } from "./UserContext";

//toastify alert
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components pages
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import User from "./pages/User";
import Logout from "./pages/Logout";
import citizen_page from "./pages/citizen/citizen_page";
import lupon_page from "./pages/lupon/lupon_page";

import Lupon from "./pages/lup/lupon";

//api functions to prevent lossing the user data when refreshing react app
import { getLoggedInUser } from "./api/user";

const App = () => {
  const [user, setUser] = useState(null);

  //preventing lossing the user data
  useEffect(() => {
    const unsubscribe = getLoggedInUser()
      .then((res) => {
        if (res.error) toast(res.error);
        else setUser(res.username);
      })
      .catch((err) => toast(err));
  }, []);

  //userlogin
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return (
        <SideBar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user" component={User} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/citizen_page" component={citizen_page} />
            <Route exact path="/lupon_page" component={lupon_page} />
            <Route exact path="/Lupon" component={Lupon} />
          </Switch>
        </SideBar>
      );
    }
  }
  return (
    <div>
      <Router>
        <UserContext.Provider
          value={{
            //usestate initalization of the user who can access the page
            user,
            setUser,
          }}
        >
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Header />
          {/* userlogin sidebar */}
          <Greeting isLoggedIn={user} />
          {/*
            using redirect react-router-dom it will 
            redirect to homepage if try to acces it in url
            */}
          <Redirect to={user ? "/" : "login"} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Login" component={Login} />
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
