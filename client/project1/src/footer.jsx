import "./navbar.css"
import { NavLink } from "react-router-dom";
function Footer() {
    return (
      <>
        <footer class="bg-light text-center text-lg-start mt-5 border-top">
    <div class="container py-4">
      <div class="row">
  
        {/* <!-- About --> */}
        <div class="col-md-4 mb-3">
          <h5 class="text-uppercase">About us</h5>
          <p class="text-muted">This is Airbnb project built using Node.js, Express, MongoDB, React,Html,Css.</p>
        </div>
  
        {/* <!-- Links --> */}
        <div class="col-md-4 mb-3">
          <h5 class="text-uppercase">Quick Links</h5>
          <ul class="list-unstyled">
            <li><NavLink to="/airbnb" className="nav-link" end>Home</NavLink></li>
            <li><NavLink to="/airbnb/all-listing" className="nav-link">All Listings</NavLink></li>
            <li><NavLink to="/airbnb/airbnb-yourhome" className="nav-link">Airbnb your Home</NavLink></li>
          </ul>
        </div>
  
        {/* <!-- Contact --> */}
        <div class="col-md-4 mb-3">
          <h5 class="text-uppercase">Contact</h5>
          <p class="text-muted mb-1">Email: sanyam272727@gmail.com.com</p>
          <p class="text-muted mb-1">Email: Dhruv@gmail.com.com</p>
          <p class="text-muted">Phone: +91-9479851113</p>
        </div>
  
      </div>
    </div>
  
    <div class="text-center bg-white py-3 border-top small">
      {/* &copy; <%= new Date().getFullYear() %> Airbnb Clone. All rights reserved. */}
    </div>
  </footer>
  
      </>
    );
  }
  
  export default Footer;
  