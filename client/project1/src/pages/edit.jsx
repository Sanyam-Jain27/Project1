import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

function Edit() {
    const { id } = useParams()
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    country: "",
    location: ""
  });

   const [item , setItem] = useState(null) ;
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [item, setItem] = useState(null);

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
      await api.patch(`/airbnb/edit/${id}`, formData);
      setLoading(true);

      const submitData = new FormData();
      if (formData.title) submitData.append("title", formData.title);
      if (formData.description) submitData.append("description", formData.description);
      if (formData.price) submitData.append("price", formData.price);
      if (formData.country) submitData.append("country", formData.country);
      if (formData.location) submitData.append("location", formData.location);

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      await api.patch(`/airbnb/edit/${id}`, submitData);

      toast.success("Listing Edited successfully!");
      navigate(`/airbnb/full-view/${id}`); 
      navigate(`/airbnb/full-view/${id}`);
    } catch (err) {
      console.log(err);
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{

    async function fetchData(){
       try {
         const res = await api.get(`/airbnb/full-view/${id}`);
         setItem(res.data);
       } catch(err) {
         console.log(err);
       }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/airbnb/full-view/${id}`);
        setItem(res.data);
        setFormData({
          title: res.data.tittle || "",
          description: res.data.description || "",
          price: res.data.price || "",
          country: res.data.country || "",
          location: res.data.location || ""
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchData()
    fetchData();
  }, [id]);

 },[id])
 if(!item) return <h2>Loading...</h2>
  if (!item) return <h2>Loading...</h2>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm p-4">
            <h3 className="mb-4 text-center">Edit Listing</h3>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={`${item.tittle}`}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder={`${item.description}`}
                />
              </div>


              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image Link</label>
                <label className="form-label">Update Image (Optional)</label>
                <input
                  type="url"
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder={`${item.img}`}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="mt-3 text-center">
                  <p className="text-muted mb-1 small">
                    {imagePreview ? "New Image Preview:" : "Current Image:"}
                  </p>
                  <img
                    src={imagePreview || item.img}
                    alt="Preview"
                    className="img-thumbnail rounded"
                    style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
                  />
                </div>
              </div>

          
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder={`${item.price}`}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="country" className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder={`${item.country}`}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={`${item.location}`}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-danger btn-lg">Edit</button>
                <button
                  type="submit"
                  className="btn btn-danger btn-lg"
                  disabled={loading}
                >
                  {loading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;