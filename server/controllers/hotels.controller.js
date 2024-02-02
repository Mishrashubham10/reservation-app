import { asyncHandler } from '../utils/asynHandler.js';
import Hotel from '../models/hotel.model.js';

// Create Hotel
const createHotel = asyncHandler(async (req, res) => {
  const newHotel = new Hotel(req.body);

  if (!newHotel) {
    res.status(404).json({ message: 'All fields are required' });
  }

  const hotel = await newHotel.save();
  res.status(200).json(hotel);
});

// UPDATE
const updateHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: 'Id is required' });
  }

  const updatedHotel = await Hotel.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updatedHotel);
});

// DELETE
const deleteHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: 'Id is required' });
  }

  const deletedHotel = await Hotel.findByIdAndDelete(id);

  res.status(200).json({ message: 'Hotel has been deleted' }, deletedHotel);
});

// GET
const hotel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: 'Id is required' });
  }

  const hotel = await Hotel.findById(id);

  if (!hotel) {
    res.status(404).json({ message: 'No hotel found' });
  }

  res.status(200).json(hotel);
});

// GET ALL
const hotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find();

  if (!hotels) {
    res.status(404).json({ message: 'Hotel not found' });
  }

  res.status(200).json(hotels);
});

export { createHotel, updateHotel, deleteHotel, hotel, hotels };