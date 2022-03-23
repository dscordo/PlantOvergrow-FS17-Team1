import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  return (
    <nav
      className="Navbar navbar navbar-expand-sm navbar-dark mb-4"
      style={{ backgroundColor: "green" }}
    >
      <div className="container-fluid">
        <span className="navbar-brand font-weight-bold">
          <NavLink className="nav-link" to="/">
            Plant Overgrow
          </NavLink>
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Left-aligned stuff */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/*  <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
            </li> */}
            {props.user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/plantinfo">
                  My Plants
                </NavLink>
              </li>
            )}
            {props.user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/addplant">
                  Add new plant
                </NavLink>
              </li>
            )}
            {props.user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/wishlist">
                  Wishlist
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Right-aligned stuff, based on whether user is logged in */}
        {props.user ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={`/users/${props.user.id}`}>
                Profile {props.user.username}
              </NavLink>
            </li>
            <li className="nav-item">
              {/* Log out user. Then go to home page. */}
              <NavLink className="nav-link" to="/" onClick={props.logoutCb}>
                Logout
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
