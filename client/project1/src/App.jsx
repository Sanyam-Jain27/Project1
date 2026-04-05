// App.js File
import "./App.css"
import React from "react";
import Navbar from "./navbar" 
import Home from "./pages/home"
import { Routes, Route } from "react-router-dom";
import AllList from "./pages/all-listing"; 
import Airbnbyourhome from "./pages/airbnb-your-home";
import FullView from "./pages/full-view";
import Edit from "./pages/edit";
import Footer from "./footer"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import Booking from "./pages/booking"
import BookingDetails from "./pages/bookingdetails"
import { ToastContainer } from "react-toastify";
function App(){
    return(
    <>
     <ToastContainer position="top-right" autoClose={2000} />
    <Navbar/>
    <Routes>
        <Route path="/airbnb/all-listing" element={<AllList />} />
        <Route path="/airbnb/airbnb-yourhome" element={<Airbnbyourhome />} />
        <Route path="/airbnb" element={<Home />} />
        <Route path="/airbnb/login" element={<Login />} />
        <Route path="/airbnb/full-view/:id" element={<FullView />} />
        <Route path="/airbnb/edit/:id" element={<Edit />} />
        <Route path="/airbnb/signup" element={<SignUp />} />
        <Route path="/airbnb/booking/:id" element={<Booking />} />
        <Route path="/airbnb/bookingdetails/:id" element={<BookingDetails />} />
      </Routes>
      <Footer/>
    </>
    )
}

export default App;