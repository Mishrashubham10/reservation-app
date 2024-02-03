import { asyncHandler } from '../utils/asynHandler.js';
import Room from '../models/room.model.js';
import Hotel from '../models/hotel.model.js';

// Create Room
const createRoom = asyncHandler(async (req, res) => {
  const hotelId = req.params.hotelid;

  if (!hotelId) return res.status(404).json({ message: 'Id is required' });

  const newRoom = new Room(req.body);

  const savedRoom = await newRoom.save();

  if (!savedRoom)
    return res
      .status(400)
      .json({ message: 'Something went wrong while creating rooms' });

  await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

  res.status(200).json(savedRoom);
});

// Update Room
const updateRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).json({ message: 'Id is required' });

  const updatedRoom = await Room.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedRoom)
    return res
      .status(403)
      .json({ message: 'Something went wrong while updating room' });

  res.status(200).json(updatedRoom);
});

// Delete Room
const deleteRoom = asyncHandler(async (req, res) => {
    const hotelId = req.params.hotelid;

  if (!hotelId) return res.status(404).json({ message: 'Id is required' });

  const deletedRoom = await Room.findByIdAndDelete(req.params.id);

  await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });

  if (!deletedRoom)
    return res
      .status(403)
      .json({ message: 'Something went wrong while updating room' });

  res.status(200).json({ message: 'Room deleted successfully' });
});

// Get Room
const room = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).json({ message: 'Id is required' });

  const room = await Room.findById(id);

  if (!room) return res.status(404).json({ message: 'Room not found' });

  res.status(200).json(room);
});

// Get Rooms
const rooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find();

  if (!rooms) return res.status(404).json({ message: 'Room not found' });

  res.status(200).json(rooms);
});

export { createRoom, updateRoom, deleteRoom, room, rooms };