import express, { Router } from 'express';
import { deleteUser, updateUser, user, users } from '../controllers/users.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/", verifyAdmin, users);
router.get("/:id", verifyUser, user);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

export default router;