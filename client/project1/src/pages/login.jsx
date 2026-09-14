import './login.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    contactno: "",
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
      const endpoint = role === "owner" ? "/airbnb/login/owner" : "/airbnb/login/user";
      const payload = {
        username: formData.username,
        password: formData.password,
        ...(role === "owner" && formData.contactno ? { contactno: formData.contactno } : {})
      };

      const res = await api.post(endpoint, payload);

      // Save JWT token for authenticated requests
      localStorage.setItem("token", res.data.token);

      // Save logged-in user information
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successfully!");
      navigate("/airbnb");
    } catch (err) {
      console.error("Login error:", err);

      const message =
        err.response?.data?.message ||
        "Wrong username/password or account does not exist.";

      toast.error(message);
    }
  }

  return (
    <>
      <div className="login-card">

        <h3 className="text-center mb-4 fw-bold">Welcome Back</h3>

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
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {role === "owner" && (
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Contact No.
              </label>

              <input
                type="text"
                className="form-control"
                name="contactno"
                value={formData.contactno}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-airbnb mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't Have an account?
          <NavLink to="/airbnb/Signup"> SignUp </NavLink>
        </p>

      </div>
    </>
  );
}

export default Login;
