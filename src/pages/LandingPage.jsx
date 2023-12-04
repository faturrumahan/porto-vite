import React from "react";
import { Link } from "react-scroll";
import About from "../components/About";
import Footer from "../components/Footer";
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import Services from "../components/Services";

const LandingPage = () => {
  return (
    <>
      <NavBar>
        <div className="hidden justify-between lg:flex lg:w-1/4">
          <Link
            className="cursor-pointer underline-offset-8 hover:underline"
            to="home"
            spy={true}
            smooth={true}
            offset={50}
            duration={1000}
          >
            Home
          </Link>
          <Link
            className="cursor-pointer underline-offset-8 hover:underline"
            to="about"
            spy={true}
            smooth={true}
            offset={50}
            duration={1000}
          >
            About
          </Link>
          <Link
            className="cursor-pointer underline-offset-8 hover:underline"
            to="services"
            spy={true}
            smooth={true}
            offset={50}
            duration={1000}
          >
            Services
          </Link>
          <Link
            className="cursor-pointer underline-offset-8 hover:underline"
            to="contact"
            spy={true}
            smooth={true}
            offset={50}
            duration={1000}
          >
            Contact
          </Link>
        </div>
      </NavBar>
      <main>
        <div id="home">
          <Home />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Services />
        </div>
      </main>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
