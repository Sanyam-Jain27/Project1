const Card = require("../model/listing");

// GET all listings
exports.getAllListings = async (req, res) => {
    const cards = await Card.find();
    res.json(cards);
};

// GET single listing
exports.getListingById = async (req, res) => {
    const { id } = req.params;

    const card = await Card.findById(id).populate("owner");
    res.json(card);
};

// CREATE listing
exports.createListing = async (req, res) => {
    const { role, ownerId } = req.body;

    if (role !== "owner") {
        return res.status(403).json({ message: "Only owner allowed" });
    }

    let { title, description, image, price, country, location } = req.body;

    if (!image) {
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
        owner: ownerId
    });

    res.json(newCard);
};

// UPDATE listing
exports.updateListing = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await Card.findById(id);

        const updatedListing = {
            tittle: req.body.tittle || card.tittle,
            description: req.body.description || card.description,
            img: req.body.image || card.img,
            price: req.body.price || card.price,
            country: req.body.country || card.country,
            location: req.body.location || card.location
        };

        await Card.findByIdAndUpdate(id, updatedListing);

        res.json(updatedListing);
    } catch (err) {
        res.status(500).send("Error updating listing");
    }
};

// DELETE listing
exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const card = await Card.findById(id);

    if (card.owner.toString() !== userId) {
        return res.status(403).json({ message: "Not allowed" });
    }

    await Card.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
};