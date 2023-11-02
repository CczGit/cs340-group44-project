import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home Page</Link>
      <Link to="/Developers">Developers</Link>
      <Link to="/Composers">Composers</Link>
      <Link to="/Composers_Songs">Composers_Songs</Link>
      <Link to="/Composers_Developers">Composers_Developers</Link>
      <Link to="/Games">Games</Link>
      <Link to="/Games_Composers">Games_Composers</Link>
      <Link to="/Songs">Songs</Link>
    </nav>
  );
}
export default Navigation;
