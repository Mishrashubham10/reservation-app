import express from 'express';
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  hotel,
  hotels,
  updateHotel,
} from '../controllers/hotels.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/", verifyAdmin, createHotel);
router.get("/", hotels);
router.get("/find/:id", hotel);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;