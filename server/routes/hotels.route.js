import express from 'express';
import {
  createHotel,
  deleteHotel,
  hotel,
  hotels,
  updateHotel,
} from '../controllers/hotels.controller.js';

const router = express.Router();

router.post("/", createHotel);
router.get("/", hotels);
router.get("/:id", hotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;