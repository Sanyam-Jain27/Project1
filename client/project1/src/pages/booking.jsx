import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
 
function Booking() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    username: "",
    contact: ""
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

 
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    axios
      .get(`https://project1-backend-qktj.onrender.com/booking/dates/${id}`)
      .then((res) => {
        const dates = [];

        res.data.forEach((b) => {
          let start = new Date(b.datein);
          let end = new Date(b.dateout);

          while (start <= end) {
            dates.push(new Date(start));
            start.setDate(start.getDate() + 1);
          }
        });

        setBookedDates(dates);
      })
      .catch((err) => console.log(err));
  }, [id]);


  async function handleSubmit(e) {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Select dates");
      return;
    }

    try {
      await axios.post(
        `https://project1-backend-qktj.onrender.com/booking`,
        {
          username: formData.username,
          contact: formData.contact,
          datein: startDate,
          dateout: endDate,
          listingId: id, 
          userId: user._id
        }
      );

      toast.success("Booking Successful 🎉");

      let newDates = [...bookedDates];
      let start = new Date(startDate);
      let end = new Date(endDate);

      while (start <= end) {
        newDates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }

      setBookedDates(newDates);

      setFormData({ username: "", contact: "" });
      setStartDate(null);
      setEndDate(null);

    } catch (err) {
      console.log(err);
      toast.error("Booking Failed");
    }
  }

  return (
    <>
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">Booking Form</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input
              type="text"
              name="contact"
              className="form-control"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Dates</label>
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              minDate={new Date()}
              excludeDates={bookedDates} 
              className="form-control"
              placeholderText="Select booking dates"
            />
          </div>

          <div className="text-center">
            <button className="btn btn-primary px-4">
              Book Now
            </button>
          </div>

        </form>

      </div>
    </div>
    <hr/>
    <div className="text-center">
  <NavLink to={`/airbnb/full-view/${id}`} className="btn btn-secondary px-4">
    ← Back to Property
  </NavLink>
</div>
 </>
  );
}

export default Booking;