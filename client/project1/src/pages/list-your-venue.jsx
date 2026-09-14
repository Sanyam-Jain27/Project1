import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

function ListYourVenue() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Login first");
      navigate("/airbnb/login");
      return;
    }

    if (user.role !== "owner") {
      toast.error("Only owners can access this page");
      navigate("/airbnb");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    country: "",
    location: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.error("Login first");
        navigate("/airbnb/login");
        return;
      }

      await api.post("/airbnb/list-your-venue", formData);
      setLoading(true);

      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("country", formData.country);
      submitData.append("location", formData.location);

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      await api.post("/airbnb/list-your-venue", submitData);

      toast.success("Listing added successfully!");
      navigate("/airbnb/all-listing");

    } catch (err) {
      console.log(err);
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
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
                <label className="form-label">Upload Venue Image</label>
                <input
                  type="url"
                  type="file"
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {imagePreview && (
                  <div className="mt-3 text-center">
                    <p className="text-muted mb-1 small">Image Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-thumbnail rounded"
                      style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
                    />
                  </div>
                )}
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
                <button
                  type="submit"
                  className="btn btn-danger btn-lg"
                  disabled={loading}
                >
                  {loading ? "Uploading & Adding..." : "Add New Listing"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListYourVenue;