import './login.css';
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();

  // 🔥 role state added
  const [role, setRole] = useState("user"); 

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    contactno: 0,
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
       
          let exist=false;
      if(role==="user"){
       let res = await axios.get("https://project1-backend-qktj.onrender.com/airbnb/login/user");
       const user = res.data.find(u => u.username === formData.username);
       if(user){
        localStorage.setItem("user", JSON.stringify({
          id: user._id,
          role: "user",
          name: user.name 
        }));
        exist = true;
      }
      }
      if(role==="owner"){
        let res = await axios.get("https://project1-backend-qktj.onrender.com/airbnb/login/owner");
        const owner = res.data.find(u => u.username === formData.username && u.contactno === formData.contactno);
        if(owner){
          localStorage.setItem("user", JSON.stringify({
            id: owner._id,
            role: "owner",
            name: owner.name 
          }));
          exist = true;
        }
       }
      if(!exist){
        toast.success("wrong usrname/password or not exist");
        return;
      }
  
      
      toast.success("Login Successfully!");
      navigate(`/airbnb`);}
      
     catch (err) {
      console.log(err);
      toast.success("Something went wrong!");
    }
  }

  return (
    <>
      <div className="login-card">

        <h3 className="text-center mb-4 fw-bold">Welcome Back</h3>

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
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
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
            </>
          )}
          <button type="submit" className="btn btn-airbnb mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't Have a account?
          <NavLink to={`/airbnb/Signup`}> SignUp </NavLink>
        </p>

      </div>
    </>
  );
}

export default Login;