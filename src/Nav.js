import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
      window.removeEventListener("click");
    };
  }, []);

  // this function handles the smooth scrolling back to the top by a click on the Watchflix logo
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        src="https://i.ibb.co/Y812LmQ/wf-nav.png"
        onClick={() => handleClick()}
        alt="Watchflix Logo"
        className="nav_logo"
      />
    </div>
  );
}

export default Nav;