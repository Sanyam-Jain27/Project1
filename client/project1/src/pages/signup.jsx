import './login.css';
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function SignUp() {
  const navigate = useNavigate();

  // 🔥 role state added
  const [role, setRole] = useState("user"); 

  const [formData, setFormData] = useState({
    age: "",
    name: "",
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
      const url =
        role === "owner"
          ? "https://your-backend.onrender.com/airbnb/signup/owner"
          : "https://your-backend.onrender.com/airbnb/signup/user";
          let exist=false;
      if(role==="user"){
       let res = await axios.get("https://your-backend.onrender.com/airbnb/signup/user");
       const user = res.data.find(u => u.username === formData.username);
       if(user){
        exist=true;
       }
      }
      if(role==="owner"){
        let res = await axios.get("https://your-backend.onrender.com/airbnb/signup/owner");
        const owner = res.data.find(u => u.username === formData.username && u.contactno === formData.contactno);
        if(owner){
            exist =true;
        }
       }
      if(exist){
        toast.success("already exist");
        return;
      }
  
      await axios.post(url, {
        ...formData,
        role
      });
      toast.success("SignUp Successfully!");
      navigate(`/airbnb`);}
      
     catch (err) {
      console.log(err);
      toast.success("Something went wrong!");
    }
  }

  return (
    <>
      <div className="login-card">

        <h3 className="text-center mb-4 fw-bold">Here you Sign Up</h3>

        {/* 🔥 SELECT ROLE */}
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
              onChange={handleChange}
              required
            />
          </div>

          {/* 🔥 EXTRA FIELDS FOR OWNER ONLY */}
          {role === "owner" && (
            <>
              <div className="mb-3">
                <label className="form-label fw-semibold">Contact No.</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactno"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
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
          <NavLink to={`/airbnb/login`}> Login </NavLink>
        </p>

      </div>
    </>
  );
}

export default SignUp;