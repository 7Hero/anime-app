import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import Searchbar from "./SearchBar"
import { NONAME } from "dns";

const Frontpage = () => {
  return (
    <>
      <header className="headerColor">
        <div className="overflow">
          <div className="container">
            <div className="container1">
            {" "}
            {/*limita la latime*/}
            <div className="elementContainer">
              {" "}
              {/*contine logoul search barul si categorille*/}
              <div className="logo">
                {" "}
                {/*contine logoul si iconul de la logo*/}
                <Link className="textLogo" to="/">animus</Link>
                <img className="plusLogo" src="plus.svg" />
              </div>
              <div className="header_center">
                {" "}
                {/*contine categoriile*/}
                <ul className="list">
                  <li className="elementList">
                    <Link className="black" to="/">HOME</Link>
                  </li>
                  <li className="elementList"><Link className="black" to="/thisseason">THIS SEASON</Link></li>
                  <li className="elementList"><Link className="black"to="/popular">POPULAR</Link></li>
                  <li className="elementList"><Link className="black"to="/animelist">ANIMELIST</Link></li>
                </ul>
              </div>
                 <Searchbar/>
             
            </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Frontpage;
