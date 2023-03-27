import React, { useContext } from "react";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";

import { logout } from "../api/user";

const Logout = () => {
  //hooks for histor
  const history = useHistory();
  //usestates
  const { user, setUser } = useContext(UserContext);
  //handler
  const Logout_func = () => {
    //handler for logut

    logout()
      .then((res) => {
        toast.success(res.message);
        //set user to null if logout
        setUser(null);
        //redirect back to login
        history.push("/login");
      })
      .catch((err) => console.error(err));
  };

  return Logout_func();
};

export default Logout;
