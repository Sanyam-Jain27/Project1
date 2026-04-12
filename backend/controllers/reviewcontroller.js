const Review = require("../model/review");
const Card = require("../model/listing");

// GET reviews
exports.getReviews = async (req, res) => {
    const { id } = req.params;

    const reviews = await Review.find({ listing: id })
        .populate("user");

    res.json(reviews);
};

// CREATE review
exports.createReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, rating, userId, role } = req.body;
        console.log(userId)
        const review = await Review.create({
            comment,
            rating: Number(rating),
            user: userId,
            userModel: role === "owner" ? "owners" : "Users",
            listing: id
        });

        const listing = await Card.findById(id);

        // add review
        listing.review.push(review._id);

        // calculate average rating
        const reviews = await Review.find({ listing: id });

        const avg =
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        listing.avgRating = avg;

        await listing.save();

        res.json(review);
    } catch (err) {
        res.status(500).json(err.message);
    }
};