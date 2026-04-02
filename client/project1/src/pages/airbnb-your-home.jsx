import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Airbnbyourhome() {

  const navigate = useNavigate();

  // 🔥 CHECK LOGIN + ROLE
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.success("Login first");
      navigate("/airbnb/login");
      return;
    }

    if (user.role !== "owner") {
      toast.success("Only owners can access this page");
      navigate("/airbnb");
    }
  }, [navigate]);

  // Step 1: Create state for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    country: "",
    location: ""
  });

  // Step 2: handleChange for inputs
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // Step 3: handleSubmit to send data to backend
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.success("Login first");
        return;
      }

      await axios.post("http://localhost:8081/airbnb/airbnbyourhome", {
        ...formData,
        role: user.role,
        ownerId: user.id   // 🔥🔥🔥 THIS WAS MISSING
      });

      toast.success("Listing added successfully!");
      navigate("/airbnb/all-listing");

    } catch (err) {
      console.log(err);
      toast.success("Something went wrong!");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm p-4">
            <h3 className="mb-4 text-center">Add New Listing</h3>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image Link</label>
                <input
                  type="url"
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-danger btn-lg">
                  Add New Listing
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Airbnbyourhome;