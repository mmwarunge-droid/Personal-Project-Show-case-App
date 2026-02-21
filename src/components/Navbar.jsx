import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="topbar">
      <nav className="nav">
        <NavLink to="/" className="navlink">
          Home
        </NavLink>
        <NavLink to="/shop" className="navlink">
          Shop
        </NavLink>
        <NavLink to="/admin" className="navlink">
          Admin Portal
        </NavLink>
      </nav>
    </header>
  );
}