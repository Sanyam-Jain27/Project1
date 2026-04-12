const Booking = require("../model/booking");
const Card = require("../model/listing");
const { Types } = require("mongoose");

// CREATE booking
exports.createBooking = async (req, res) => {
    try {
        const { username, contact, datein, dateout, listingId, userId } = req.body;

        const booking = new Booking({
            username,
            contact,
            datein,
            dateout,
            listingsdetails: listingId,
            user: userId
        });

        await booking.save();

        res.send("Booking done");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// GET bookings
exports.getBookings = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        const listing = await Card.findById(id);
        if (!listing) return res.status(404).send("Listing not found");

        let query = { listingsdetails: id };

        // 🔥 Always filter by user if provided
        if (userId) {
            query.user = userId;
        }

        const bookings = await Booking.find(query).populate("user");

        res.json(bookings);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// GET booked dates
exports.getBookedDates = async (req, res) => {
    const bookings = await Booking.find({
        listingsdetails: req.params.id
    });

    const dates = bookings.map(b => ({
        datein: b.datein,
        dateout: b.dateout
    }));

    res.json(dates);
};

// DELETE booking
exports.deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { userId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    const listing = await Card.findById(booking.listingsdetails);

    if (listing.owner.toString() !== userId) {
        return res.status(403).json({ message: "Not allowed" });
    }

    await Booking.findByIdAndDelete(bookingId);

    res.json({ message: "Booking cancelled" });
};