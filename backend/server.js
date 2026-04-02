const Card = require("./model/listing.js");
const User = require("./model/user.js");
const Owner = require("./model/owner.js");
// HERE WE CONNECT MONGOOSE -
const mongoose = require('mongoose');
main()
.then(()=>{console.log("connection success");})
.catch(err=>{console.log(err)});
async function main() {
    // This will use Atlas in production and local in development
    const dbUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/airbnb';
    await mongoose.connect(dbUrl);
}

// HERE WE USE EXPRESS
const express= require('express');
const app =express();

// IT USES BECAUSE FRONTEND AND BACKEND BOTH RUN ON DIFFRENT PORT SO FRONTEND NOT ACCEPT BACKEND BECAUSE OF DIFFRENT PORT
const cors = require("cors")
app.use(cors());
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.get("/airbnb/all-listing",async(req,res)=>{
    const cards = await Card.find();
    console.log(cards);
    res.json(cards);
})
app.get("/airbnb/full-view/:id", async (req,res)=>{
    const { id } = req.params;

    const card = await Card.findById(id)
        .populate("owner");   // 🔥 IMPORTANT

    res.json(card);
});

app.use(express.json());
app.post("/airbnb/airbnbyourhome", async (req,res)=>{

    const { role, ownerId } = req.body;

    if(role !== "owner"){
        return res.status(403).json({message:"Only owner allowed"});
    }

    let { title, description, image, price, country, location } = req.body;

    if(!image){
        image = "https://media.istockphoto.com/id/1324356458/vector/picture-icon-photo-frame-symbol.jpg";
    }

    const newCard = await Card.create({
        img: image,
        tittle: title,
        description,
        price,
        country,
        location,
        review: [],
        owner: ownerId   // 🔥 STORE OWNER ID
    });

    res.json(newCard);
});

app.patch("/airbnb/edit/:id", async (req, res) => {
    try {
      const { id } = req.params;
   
      
        let card = await Card.findById(id);
        let tittle = req.body.tittle||card.tittle;
        let description = req.body.description||card.description;
        let image = req.body.image||card.img;
        let price = req.body.price||card.price;
        let country = req.body.country||card.country;
        let location = req.body.location||card.location;
        let updatedListing ={
            tittle:tittle,
            description:description,
            img:image,
            price:price,
            country:country,
            location:location
        }

        await Card.findByIdAndUpdate(id, {tittle:tittle});
        await Card.findByIdAndUpdate(id, {img:image});
        await Card.findByIdAndUpdate(id, {description:description});
        await Card.findByIdAndUpdate(id, {price:price});
        await Card.findByIdAndUpdate(id, {country:country});
        await Card.findByIdAndUpdate(id, {location:location});  
  
      res.json(updatedListing);
    } catch (err) {
      res.status(500).send("Error updating listing");
    }
  });

  app.delete("/airbnb/delete/:id", async (req,res)=>{
    const {id} = req.params;
    const { userId } = req.body;

    const card = await Card.findById(id);

    if(card.owner.toString() !== userId){
        return res.status(403).json({message:"Not allowed"});
    }

    await Card.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
});
app.get("/airbnb/login/user",async(req,res)=>{
    const user = await User.find();
    console.log(user);
    res.json(user);
})
app.get("/airbnb/login/owner",async(req,res)=>{
    const owner = await Owner.find();
    console.log(owner);
    res.json(owner);
})
 
app.get("/airbnb/signup/user",async(req,res)=>{
    const user = await User.find();
    console.log(user);
    res.json(user);
})
app.get("/airbnb/signup/Owner",async(req,res)=>{
    const owner = await Owner.find();
    console.log(owner);
    res.json(owner);
})
app.post("/airbnb/signup/user",async(req,res)=>{
    let name=req.body.name;
    let age=req.body.age;
    let username=req.body.username;
    let password=req.body.password;

    const newUser =await User.create({
    name: `${name}`,
    age:`${age}`,
    username: `${username}`,
    password:`${password}`,
    })
    res.json(newUser)
})
app.post("/airbnb/signup/owner",async(req,res)=>{
    let name=req.body.name;
    let age=req.body.age;
    let username=req.body.username;
    let password=req.body.password;
    let contactno=req.body.contactno;
    let email=req.body.email;
    console.log(name);
    const newUser =await Owner.create({
        name: `${name}`,
        age:`${age}`,
        username: `${username}`,
        password:`${password}`,
        contactno:`${contactno}`,
        email:`${email}`,
    })
    res.json(newUser)
})

app.get("/airbnb/check/:hid",async (req,res)=>{
    const {hid} =req.params;
    const user =await User.findById(hid);
    const owner =await Owner.findById(hid);
    let check =false;
    if(user||owner){
        check =true;
    }
    res.json(check);
})


const Review = require("./model/review.js");



app.get("/airbnb/review/:id", async (req,res)=>{
    const { id } = req.params;

    const reviews = await Review.find({ listing: id })
        .populate("user");   // 🔥 NOW WORKS FOR BOTH

    res.json(reviews);
});
app.post("/airbnb/review/:id", async (req,res)=>{
    try{
      const { id } = req.params;
      const { comment, rating, userId, role } = req.body;
  
      const review = await Review.create({
        comment,
        rating: Number(rating),
        user: userId,
        userModel: role === "owner" ? "owners" : "Users", // ✅ ADD THIS
        listing: id
      });
  
      const listing = await Card.findById(id);
  
      listing.review.push(review._id);
  
      const reviews = await Review.find({ listing: id });
  
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  
      listing.avgRating = avg;
  
      await listing.save();
  
      res.json(review);
  
    } catch(err){
      console.log(err);
      res.status(500).json(err.message);
    }
  });