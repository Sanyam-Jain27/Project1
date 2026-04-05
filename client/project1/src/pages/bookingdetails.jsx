import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function BookingDetails() {
  const { id } = useParams(); // 🔥 listingId
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 FETCH BOOKINGS OF THIS PROPERTY
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get(
          `https://project1-backend-qktj.onrender.com/booking/${id}`,
          {
            params: { userId: user.id } // 🔥 REQUIRED
          }
        );
        setBookings(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchBookings();
  }, [id]);

  // 🔥 DELETE BOOKING
  async function handleDelete(bookingId) {
    try {
      await axios.delete(
        `https://project1-backend-qktj.onrender.com/booking/${bookingId}`,
        {
          data: {
            userId: user.id, // 🔥 for auth
          },
        }
      );

      toast.success("Booking Cancelled");

      // 🔥 remove from UI
      setBookings(bookings.filter((b) => b._id !== bookingId));

    } catch (err) {
      console.log(err);
      toast.error("Not allowed");
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow p-4">

          <h2 className="text-center mb-4">Booking Details</h2>

          {bookings.length === 0 && (
            <p className="text-center">No bookings yet</p>
          )}

          {bookings.map((b) => (
            <div key={b._id} className="border rounded p-3 mb-3">

              <p><strong>Name:</strong> {b.username}</p>
              <p><strong>Contact:</strong> {b.contact}</p>
              <p><strong>Check-In:</strong> {new Date(b.datein).toDateString()}</p>
              <p><strong>Check-Out:</strong> {new Date(b.dateout).toDateString()}</p>

              <button
                onClick={() => handleDelete(b._id)}
                className="btn btn-danger btn-sm mt-2"
              >
                Cancel Booking
              </button>

            </div>
          ))}

        </div>
      </div>

      {/* 🔥 BACK BUTTON */}
      <div className="text-center mt-3">
        <NavLink
          to={`/airbnb/full-view/${id}`}
          className="btn btn-secondary px-4"
        >
          ← Back to Property
        </NavLink>
      </div>
    </>
  );
}

export default BookingDetails;