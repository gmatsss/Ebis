//sfc stateless function
import React, { useContext } from "react";
//install react-router-dom
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
//components pages
import SideBar from "../components/SideBar";

import User from "../pages/User";
import Logout from "../pages/Logout";
import citizen_page from "../pages/citizen/citizen_page";
import lupon_page from "../pages/lupon/lupon_page";

//usercontent
import { UserContext } from "../UserContext";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
