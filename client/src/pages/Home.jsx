//sfc stateless function
import React, { useContext } from "react";
//usercontent
import { UserContext } from "../UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return <h1>Home</h1>;
};

export default Home;
