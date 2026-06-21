import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/airbnb");
    // window.location.reload(); // refresh UI
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top custom-navbar">
        <div className="container-xl px-3">

          {/* Brand */}
          <NavLink to="/airbnb" className="navbar-brand d-flex align-items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              className="brand-logo"
              alt="Logo"
            />
            <span className="fw-bold fs-5 text-dark brand-text">Stay Finder </span>
          </NavLink>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav align-items-center">

              <li className="nav-item">
                <NavLink to="/airbnb" className="nav-link px-3">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/airbnb/all-listing" className="nav-link px-3">
                  All Listings
                </NavLink>
              </li>

              {/* Airbnb your Home (protected) */}
              <li className="nav-item">
                <NavLink
                  to="#"
                  className="btn-airbnb-outline ms-lg-2"
                  onClick={(e) => {
                    e.preventDefault();

                    const user = JSON.parse(localStorage.getItem("user"));

                    if (!user) {
                      alert("Login first");
                      navigate("/airbnb/login");
                      return;
                    }

                    if (user.role !== "owner") {
                      alert("Only owners can list property");
                      return;
                    }

                    navigate("/airbnb/airbnb-yourhome");
                  }}
                >
                  Airbnb your Home
                </NavLink>
              </li>

              {/* 🔥 CONDITIONAL RENDERING */}
              {!user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/airbnb/login" className="btn-airbnb-outline1 ms-lg-1">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/airbnb/Signup" className="btn-airbnb-outline1 ms-lg-1">
                      SignUp
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                <li className="nav-item">
  <span className="user-pill">
    {user.name} • {user.role}
  </span>
</li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="logout-btn">
  Logout
</button>
                </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="mobileMenu">
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-bold">Menu</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav flex-column gap-3">

            <li>
              <NavLink to="/airbnb" className="nav-link">Home</NavLink>
            </li>

            <li>
              <NavLink to="/airbnb/all-listing" className="nav-link">
                All Listings
              </NavLink>
            </li>

            <li>
              <NavLink
                to="#"
                className="nav-link fw-bold"
                onClick={(e) => {
                  e.preventDefault();

                  const user = JSON.parse(localStorage.getItem("user"));

                  if (!user) {
                    alert("Login first");
                    navigate("/airbnb/login");
                    return;
                  }

                  if (user.role !== "owner") {
                    alert("Only owners can list property");
                    return;
                  }

                  navigate("/airbnb/airbnb-yourhome");
                }}
              >
                Airbnb your home
              </NavLink>
            </li>

            <hr />

            {!user ? (
              <>
                <li>
                  <NavLink to="/airbnb/login" className="nav-link">Login</NavLink>
                </li>

                <li>
                  <NavLink to="/airbnb/Signup" className="nav-link">SignUp</NavLink>
                </li>
              </>
            ) : (
              <>
              <li className="nav-item">
  <span className="user-pill">
    {user.name} • {user.role}
  </span>
</li>
                <li>
                <button onClick={handleLogout} className="logout-btn">
  Logout
</button>
              </li></>
            )}

          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;