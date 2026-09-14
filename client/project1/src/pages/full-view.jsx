import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import './full-view.css';

function FullView() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  const [newReview, setNewReview] = useState({
    comment: "",
    rating: 0
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  async function handleDelete() {
    try {
      await api.delete(`/airbnb/delete/${id}`);
      toast.success("Deleted Successfully");
      navigate("/airbnb/all-listing");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Not allowed");
    }
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();

    if (!user) {
      toast.error("Login first");
      return;
    }

    if (newReview.rating === 0) {
      toast.error("Please select rating");
      return;
    }

    try {
      await api.post(`/airbnb/review/${id}`, {
        comment: newReview.comment,
        rating: newReview.rating
      });

      toast.success("Review added!");

      const res1 = await api.get(`/airbnb/review/${id}`);
      setReviews(res1.data);

      const res2 = await api.get(`/airbnb/full-view/${id}`);
      setItem(res2.data);

      setNewReview({ comment: "", rating: 0 });

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding review");
    }
  }

  useEffect(() => {
    async function fetchMyBookings() {
      if (!user) return;

      try {
        const res = await api.get(
          `/booking/${id}`,
          { params: { userId: user._id } }
        );

        setMyBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setMyBookings([]);
      }
    }

    async function fetchData() {
      try {
        const res = await api.get(`/airbnb/full-view/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchReviews() {
      try {
        const res = await api.get(`/airbnb/review/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
    fetchReviews();
    fetchMyBookings();
  }, [id]);

  if (!item) return <h2 className="text-center mt-5">Loading...</h2>;

  const isOwner =
    user &&
    item.owner &&
    (user._id === (item.owner._id || item.owner));

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">

            <div className="card shadow-lg mb-5">
              <img src={item.img} className="card-img-top img-fluid" alt="Listing" />

              {user?.role === "user" && myBookings.length === 0 ? (
                <p className="text-muted p-3 mb-0">No bookings found</p>
              ) : (
                user?.role === "user" && (
                  <div className="p-3">
                    <hr />
                    <p className="text-muted mb-2">
                      <strong>Your Bookings:</strong>
                    </p>
                    <ul className="list-group">
                      {myBookings.map((b) => (
                        <li key={b._id} className="list-group-item">
                          📅 {new Date(b.datein).toLocaleDateString()} →{" "}
                          {new Date(b.dateout).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}

              <div className="card-body p-4">

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

                  {user?.role === "user" && (
                    <NavLink to={`/airbnb/booking/${id}`} className="book-btn">
                      Book
                    </NavLink>
                  )}
                  {user?.role === "owner" && isOwner && (
                    <NavLink to={`/airbnb/bookingdetails/${id}`} className="book-btn">
                      View Bookings
                    </NavLink>
                  )}
                </div>

                <p className="text-muted mt-2">
                  <strong>Hosted by:</strong> {item.owner?.name || "Unknown"}
                </p>

                <p>
                  <strong>Average Rating:</strong> ⭐ {item.avgRating ? item.avgRating.toFixed(1) : 0}
                </p>

                <p className="text-muted mb-3">{item.description}</p>

                <ul className="list-group list-group-flush mb-4">
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

                <form onSubmit={handleReviewSubmit} className="mt-4">
                  <h5>Add Review</h5>

                  <div className="mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: "28px",
                          cursor: "pointer",
                          color: star <= newReview.rating ? "gold" : "lightgray"
                        }}
                        onClick={() => setNewReview({
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
                    onChange={(e) => setNewReview({
                      ...newReview,
                      comment: e.target.value
                    })}
                    required
                  />

                  <button type="submit" className="btn btn-success">
                    Submit Review
                  </button>
                </form>

                <h4 className="mt-4">Reviews</h4>

                {reviews.length === 0 && <p className="text-muted">No reviews yet</p>}

                {reviews.map((r) => (
                  <div key={r._id} className="border p-3 mb-2 rounded">
                    <p className="mb-1"><strong>{r?.user?.name || "Anonymous"}</strong></p>
                    <p className="mb-1">⭐ {r?.rating || 0}</p>
                    <p className="mb-0 text-muted">{r?.comment}</p>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="text-center mb-5">
        <NavLink to="/airbnb/all-listing" className="btn btn-secondary px-4">
          ← Back to Listings
        </NavLink>
      </div>
    </>
  );
}

export default FullView;