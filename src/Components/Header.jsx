import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Config";
import {signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const handleSignOut=(()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/signin")
    }).catch((error) => {
      // An error happened.
    });
  })

  return (
    <header>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Sajelni
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/signin">
                    Sign in
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign up
                  </Link>
                </li>
              </>
            )}

            {user && <>
              <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/profile">
                    Profile
                  </Link>
                </li>

                <li onClick={()=>{
                  handleSignOut()
                }} className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Log out
                  </Link>
                </li>
            </> }

            <li>
            
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
    
  );
}

export default Header;
