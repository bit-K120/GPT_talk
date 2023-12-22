import React from "react";
import "./LP.css";

const Navbar = () => {
  return(
      /*  Navbar Section */
   <nav className="navbar navbar-light bg-light custom-navbar" >
        <a className="navbar-brand" href="#">
            <img src="/talk.ai_logo.png" style={{ borderRadius: '0', width: "150px", height: "60px"}} alt =""/>
        </a>
    </nav>
  );
};

export default Navbar;