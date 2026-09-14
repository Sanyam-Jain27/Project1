const Review = require("../model/review");
const Card = require("../model/listing");

// GET reviews
exports.getReviews = async (req, res) => {
    try {
        const { id } = req.params;

        const reviews = await Review.find({ listing: id })
            .populate("user");

        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error fetching reviews", error: err.message });
    }
};

// CREATE review
exports.createReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, rating } = req.body;

        const listing = await Card.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        const review = await Review.create({
            comment,
            rating: Number(rating),
            user: req.user.id,
            userModel: req.user.role === "owner" ? "owners" : "Users",
            listing: id
        });

        // add review
        listing.review.push(review._id);

        // calculate average rating
        const reviews = await Review.find({ listing: id });

        const avg =
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        listing.avgRating = avg;

        await listing.save();

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: "Error creating review", error: err.message });
    }
};