import { useEffect, useState } from "react"
import axios from "axios"
import './all-listing.css'
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function AllList(){
    const navigate = useNavigate();
    // let {hid}=useParams();
    const [listings , setListings] = useState([])
     
    // async function handleSubmit(){
    //    const res = await axios.get(`https://project1-backend-qktj.onrender.com/airbnb/check/${hid}`);
    //    if(res){
    //     navigate("")
    //    }
    // }
    useEffect(()=>{

        async function fetchListings(){
            try{
                const res = await axios.get("https://project1-backend-qktj.onrender.com/airbnb/all-listing")
                setListings(res.data)
            }
            catch(err){
                console.log(err)
            }
        }

        fetchListings()

    },[])
    return(
        <>
         

        <div className="container mt-5">
            <h1 className="fw-bold mb-4 text-center">All Listings</h1>

            <div className="row g-4">

                {listings.map((card)=>(
                    
                    <div className="col-12 col-sm-6 col-md-4" key={card._id}>
                        
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-card">

                            {/* Image clickable */}
                            
                            <NavLink to= {`/airbnb/full-view/${card._id}`}  >
                            <button className="p-0 border-0 bg-transparent w-100">
                                <img 
                                    src={card.img}
                                    className="card-img-top"
                                    alt={card.title}
                                    style={{height:"220px",objectFit:"cover"}}
                                /> 
                            </button>
                            </NavLink>
                            

                            {/* Card body */}
                            <div className="card-body d-flex flex-column">

                                <h5 className="card-title text-truncate fw-semibold mb-2">
                                    {card.tittle}
                                </h5>

                                <p className="card-text text-muted mb-2">
                                    <b>Price:</b> {card.price}/night
                                </p>
                                {/* <form onSubmit={handleSubmit}> */}
                                <button
  className="btn btn-outline-danger btn-sm mt-auto rounded-pill"
  onClick={() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
      alert("Login first");
      return;
    }

    navigate(`/airbnb/full-view/${card._id}`);;
  }}
>
  View Details
</button>
                               {/* </form> */}

                            </div>

                        </div>

                    </div>

                ))}

            </div>
        </div>
        </>
    )
}

export default AllList