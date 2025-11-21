import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 1️⃣ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/cabdb");

// 2️⃣ Define Booking Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  pickup: String,
  drop: String,
  datetime: String,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

// 3️⃣ POST route for booking
app.post("/book", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json({ message: "✅ Booking Successful! We’ll contact you soon." });
  } catch (err) {
    res.status(500).json({ message: "❌ Error saving booking" });
  }
});

// 4️⃣ GET route for admin to view all bookings
app.get("/bookings", async (req, res) => {
  const allBookings = await Booking.find().sort({ createdAt: -1 });
  res.json(allBookings);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const bookings = JSON.parse(localStorage.getItem("cab_bookings")) || [];
bookings.push(data);
localStorage.setItem("cab_bookings", JSON.stringify(bookings));
