import React from "react";

import { Link, Switch } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/devs">Devs</Link>
        <Link to="/employers">Employers</Link>
        <Link to="/community">Community</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
    </div>
  );
}
