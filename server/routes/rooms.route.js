import express, { Router } from 'express';
import { createRoom, deleteRoom, room, rooms, updateRoom } from '../controllers/rooms.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom)
router.get('/', rooms);
router.get('/:id', room);
router.put('/:id', verifyAdmin, updateRoom);
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

export default router;