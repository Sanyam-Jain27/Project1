
import { NavLink } from "react-router-dom";

function Home() {
    return (
      <>
 
<section class="bg-light py-5 text-center">
  <div class="container">
    <h1 class="display-4 fw-bold">Welcome to Airbnb Clone</h1>
    <p class="lead text-muted">Find unique places to stay and experience around the world.</p>
    <NavLink to="/airbnb/all-listing" className="btn btn-primary btn-lg mt-3">Explore Listings</NavLink>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <h2 class="mb-4 text-center">Why choose us?</h2>
    <div class="row text-center">
      <div class="col-md-4">
        <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" width="64" alt="Icon"/>
        <h5 class="mt-3">Unique Stays</h5>
        <p>Choose from cabins, apartments, castles, and more.</p>
      </div>
      <div class="col-md-4">
        <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="64" alt="Icon"/>
        <h5 class="mt-3">Trusted Hosts</h5>
        <p>Stay with verified, top-rated hosts for a great experience.</p>
      </div>
      <div class="col-md-4">
        <img src="https://cdn-icons-png.flaticon.com/512/3076/3076129.png" width="64" alt="Icon"/>
        <h5 class="mt-3">Great Locations</h5>
        <p>Find homes close to popular destinations and cities.</p>
      </div>
    </div>
  </div>
</section>

<section class="bg-primary text-white py-5 text-center">
  <div class="container">
    <h2 class="fw-bold">Have a place to share?</h2>
    <p>Become a host and earn money from your space.</p>
    <NavLink to ="/airbnb/airbnb-yourhome" className="btn btn-light btn-lg">Airbnb your home</NavLink>
  </div>
</section>

      </>
    );
  }
  
  export default Home;
  