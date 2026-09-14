import './login.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

function SignUp() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    username: "",
    password: "",
    contactno: "",
    email: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const endpoint =
        role === "owner"
          ? "/airbnb/signup/owner"
          : "/airbnb/signup/user";

      const payload = role === "owner"
        ? formData
        : {
            name: formData.name,
            age: formData.age,
            username: formData.username,
            password: formData.password
          };

      const res = await api.post(endpoint, payload);

      // Save JWT returned by the backend
      localStorage.setItem("token", res.data.token);

      // Save logged-in user information
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("SignUp Successfully!");
      navigate("/airbnb");

    } catch (err) {
      console.error("Signup error:", err);

      const message =
        err.response?.data?.message ||
        "Signup failed. Please try again.";

      toast.error(message);
    }
  }

  return (
    <>
      <div className="login-card">

        <h3 className="text-center mb-4 fw-bold">Here you Sign Up</h3>

        <select
          className="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="owner">Owner</option>
        </select>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Age</label>
            <input
              type="text"
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Create Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* EXTRA FIELDS FOR OWNER ONLY */}
          {role === "owner" && (
            <>
              <div className="mb-3">
                <label className="form-label fw-semibold">Contact No.</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactno"
                  value={formData.contactno}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-airbnb mt-2">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Have an account?
          <NavLink to="/airbnb/login"> Login </NavLink>
        </p>

      </div>
    </>
  );
}

export default SignUp;
