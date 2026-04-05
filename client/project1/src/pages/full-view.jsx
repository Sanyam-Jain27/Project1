import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import './full-view.css'

function FullView(){

   const { id } = useParams()
   const [item , setItem] = useState(null)
   const [reviews, setReviews] = useState([])
   const [myBookings, setMyBookings] = useState([])

   const [newReview, setNewReview] = useState({
     comment: "",
     rating: 0
   })

   const navigate = useNavigate()
   const user = JSON.parse(localStorage.getItem("user"))

   // 🔥 DELETE
   async function handleDelete(){
    try{
       await axios.delete(`https://project1-backend-qktj.onrender.com/airbnb/delete/${id}`, {
         data: { userId: user._id }
       });

       toast.success("Deleted Successfully")
       navigate("/airbnb/all-listing")

    } catch(err){
       console.log(err)
       toast.error("Not allowed")
    }
   }

   // 🔥 ADD REVIEW
   async function handleReviewSubmit(e){
    e.preventDefault();

    if(!user){
      toast.error("Login first");
      return;
    }

    if(newReview.rating === 0){
      toast.error("Please select rating");
      return;
    }

    try{
      await axios.post(`https://project1-backend-qktj.onrender.com/airbnb/review/${id}`, {
        comment: newReview.comment,
        rating: newReview.rating,
        userId: user._id,
        role: user.role
      });

      toast.success("Review added!");

      const res1 = await axios.get(`https://project1-backend-qktj.onrender.com/airbnb/review/${id}`);
      setReviews(res1.data);

      const res2 = await axios.get(`https://project1-backend-qktj.onrender.com/airbnb/full-view/${id}`);
      setItem(res2.data);

      setNewReview({ comment: "", rating: 0 });

    } catch(err){
      console.log(err)
      toast.error("Error adding review");
    }
   }

   // 🔥 FETCH USER BOOKINGS (MULTIPLE)
   

   // 🔥 FETCH DATA
   useEffect(()=>{
    async function fetchMyBookings(){
      if(!user) return;
  
      try{
        const res = await axios.get(
          `https://project1-backend-qktj.onrender.com/booking/${id}`
        );
        console.log("USER:", user);
        console.log("API BOOKINGS:", res.data);
        const bookings = res.data.filter(
          (b) =>
            b.user &&
            (b.user._id?.toString() === user._id || b.user.toString() === user._id)
        );
  
        setMyBookings(bookings);
  
      } catch(err){
        console.log(err)
      }
     }
      async function fetchData(){
         const res = await axios.get(`https://project1-backend-qktj.onrender.com/airbnb/full-view/${id}`);
         setItem(res.data)
      }

      async function fetchReviews(){
         const res = await axios.get(`https://project1-backend-qktj.onrender.com/airbnb/review/${id}`);
         setReviews(res.data)
      }

      fetchData()
      fetchReviews()
      fetchMyBookings()

   },[id])

   if(!item) return <h2>Loading...</h2>

   // 🔥 OWNER CHECK
   const isOwner =
     user &&
     item.owner &&
     (user._id === (item.owner._id || item.owner));

   return(
      <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">

            <div className="card shadow-lg mb-5">
              <img src={item.img} className="card-img-top img-fluid" alt="Listing"/>

              {/* 🔥 SHOW ALL BOOKINGS (MULTIPLE INTERVALS) */}
              {myBookings.length > 0 && (
                <div className="alert alert-success m-3">
                  <strong>✅ Your Bookings:</strong>
                  <ul className="mb-0 mt-2">
                    {myBookings.map((b)=>(
                      <li key={b._id}>
                        {new Date(b.datein).toLocaleDateString()} →{" "}
                        {new Date(b.dateout).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="card-body p-4">

                {/* OWNER CONTROLS */}
                {isOwner && (
                  <div className="d-flex gap-2 mb-3">
                    <NavLink to={`/airbnb/edit/${item._id}`}>
                      <button className="btn btn-outline-primary btn-sm px-3">
                        Edit
                      </button>
                    </NavLink>

                    <button 
                      onClick={handleDelete} 
                      className="btn btn-outline-danger btn-sm px-3"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="fw-bold mb-0">{item.tittle}</h3>

                  {/* 🔥 USER → ALWAYS SHOW BOOK */}
                  {user?.role === "user" && (
                    <NavLink to={`/airbnb/booking/${id}`} className="book-btn">
                      Book
                    </NavLink>
                  )}

                  {/* 🔥 OWNER */}
                  {user?.role === "owner" && isOwner && (
                    <NavLink to={`/airbnb/bookingdetails/${id}`} className="book-btn">
                      Booking Details
                    </NavLink>
                  )}
                </div>

                <p className="text-muted">
                  <strong>Hosted by:</strong> {item.owner?.name || "Unknown"}
                </p>

                <p>
                  <strong>Average Rating:</strong> ⭐ {item.avgRating?.toFixed(1) || 0}
                </p>

                <p className="text-muted mb-3">{item.description}</p>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Price:</strong> {item.price} / night
                  </li>
                  <li className="list-group-item">
                    <strong>Country:</strong> {item.country}
                  </li>
                  <li className="list-group-item">
                    <strong>Location:</strong> {item.location}
                  </li>
                </ul>

                {/* ⭐ REVIEW */}
                <form onSubmit={handleReviewSubmit} className="mt-4">
                  <h5>Add Review</h5>

                  <div className="mb-3">
                    {[1,2,3,4,5].map((star)=>(
                      <span
                        key={star}
                        style={{
                          fontSize: "28px",
                          cursor: "pointer",
                          color: star <= newReview.rating ? "gold" : "lightgray"
                        }}
                        onClick={()=>setNewReview({
                          ...newReview,
                          rating: star
                        })}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <textarea
                    value={newReview.comment}
                    className="form-control mb-2"
                    placeholder="Write your comment"
                    onChange={(e)=>setNewReview({
                      ...newReview,
                      comment: e.target.value
                    })}
                    required
                  />

                  <button className="btn btn-success">
                    Submit Review
                  </button>
                </form>

                {/* REVIEWS */}
                <h4 className="mt-4">Reviews</h4>

                {reviews.length === 0 && <p>No reviews yet</p>}

                {reviews.map((r)=>(
                  <div key={r._id} className="border p-2 mb-2 rounded">
                    <p><strong>{r.user?.name || "Anonymous"}</strong></p>
                    <p>⭐ {r.rating}</p>
                    <p>{r.comment}</p>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="text-center">
        <NavLink to="/airbnb/all-listing" className="btn btn-secondary px-4">
          ← Back to Listings
        </NavLink>
      </div> 
      </>
   )
}

export default FullView;