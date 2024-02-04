import { asyncHandler } from '../utils/asynHandler.js';
import Hotel from '../models/hotel.model.js';
import { handleError } from '../utils/createError.js';

// Create Hotel
const createHotel = asyncHandler(async (req, res) => {
  const newHotel = new Hotel(req.body);

  if (!newHotel) {
    res.status(404).json({ message: 'Id is required' });
  }

  const hotel = await newHotel.save();
  res.status(200).json(hotel);
});

// UPDATE
const updateHotel = asyncHandler(async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
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
const hotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// COUNTBYCITY
const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// COUNTBYTYPE
const countByType = asyncHandler(async (req, res) => {
  const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
  const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
  const resortCount = await Hotel.countDocuments({ type: 'resort' });
  const villaCount = await Hotel.countDocuments({ type: 'villa' });
  const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

  res.status(200).json([
    { type: 'hotel', count: hotelCount },
    { type: 'apartments', count: apartmentCount },
    { type: 'resorts', count: resortCount },
    { type: 'villas', count: villaCount },
    { type: 'cabins', count: cabinCount },
  ]);
});

export {
  createHotel,
  updateHotel,
  deleteHotel,
  hotel,
  hotels,
  countByCity,
  countByType,
};
