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
    try {
        if (req.user.role !== "owner") {
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
            owner: req.user.id
        });

        res.status(201).json(newCard);
    } catch (err) {
        res.status(500).json({ message: "Error creating listing", error: err.message });
    }
};

// UPDATE listing
exports.updateListing = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (card.owner && card.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed to edit this listing" });
        }

        const updatedListing = {
            tittle: req.body.tittle || card.tittle,
            description: req.body.description || card.description,
            img: req.body.image || req.body.img || card.img,
            price: req.body.price !== undefined ? req.body.price : card.price,
            country: req.body.country || card.country,
            location: req.body.location || card.location
        };

        const updated = await Card.findByIdAndUpdate(id, updatedListing, { returnDocument: 'after' });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error updating listing", error: err.message });
    }
};

// DELETE listing
exports.deleteListing = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (card.owner && card.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await Card.findByIdAndDelete(id);

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting listing", error: err.message });
    }
};