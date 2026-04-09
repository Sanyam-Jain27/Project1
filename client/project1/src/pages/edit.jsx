import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Edit() {
    const { id } = useParams()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    country: "",
    location: ""
  });

   const [item , setItem] = useState(null) ;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.patch(`https://project1-backend-qktj.onrender.com/airbnb/edit/${id}`, formData);
      toast.success("Listing Edited successfully!");
      navigate(`/airbnb/full-view/${id}`); 
    } catch (err) {
      console.log(err);
      toast.success("Something went wrong!");
    }
  }

  useEffect(()=>{

    async function fetchData(){
       const res = await axios.get(`https://project1-backend-qktj.onrender.com/airbnb/full-view/${id}`);
       setItem(res.data)
    }

    fetchData()

 },[id])
 if(!item) return <h2>Loading...</h2>

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
                <input
                  type="url"
                  className="form-control"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder={`${item.img}`}
                />
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
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;