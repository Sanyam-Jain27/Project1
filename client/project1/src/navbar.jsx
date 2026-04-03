import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // 🔥 Listen for login/logout changes
  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");

    // 🔥 trigger update
    window.dispatchEvent(new Event("storage"));

    alert("Logged out successfully");
    navigate("/airbnb");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top custom-navbar">
      <div className="container-xl px-3">

        <NavLink to="/airbnb" className="navbar-brand">
          Airbnb
        </NavLink>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">

            <li>
              <NavLink to="/airbnb">Home</NavLink>
            </li>

            <li>
              <NavLink to="/airbnb/all-listing">All Listings</NavLink>
            </li>

            <li>
              <button
                onClick={() => {
                  if (!user) {
                    alert("Login first");
                    navigate("/airbnb/login");
                    return;
                  }

                  if (user.role !== "owner") {
                    alert("Only owners allowed");
                    return;
                  }

                  navigate("/airbnb/airbnb-yourhome");
                }}
              >
                Airbnb your Home
              </button>
            </li>

            {!user ? (
              <>
                <li>
                  <NavLink to="/airbnb/login">Login</NavLink>
                </li>

                <li>
                  <NavLink to="/airbnb/Signup">Signup</NavLink>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;