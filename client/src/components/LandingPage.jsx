import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import "./LandingPage.css";
import Image from "../images/logo.png";
import LandingImg from "../images/landing.png";

function Landing() {
  return (
    <Fragment>
      <div className="landing-page">
      <div className="header">
        <Link to="/home">
          <img src={Image} alt="logo" className="logo" />
        </Link>
      </div>
      <div className="landing-page-left">
        <div className="text">
          <h1>
            <span>
              The <br />
              Recipe App
            </span>
          </h1>
          <p>Delicious food for every mood</p>
        </div>
      </div>
      <div className="landing-page-right">
        <div className="landing-img">
          <img src={LandingImg} alt="landing" className="landingRotate" />
          <Link to="/home" id="click">
            <button className="homeButton">Let's Cook!</button>
          </Link>
        </div>
        <div></div>
      </div>
      <div className="footer">
        <footer> Made with ♡ by Rodrigo Lanfri </footer>
      </div>
    </div>
    </Fragment>
  );
}

export default Landing;
