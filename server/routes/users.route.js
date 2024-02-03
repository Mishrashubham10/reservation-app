import express, { Router } from 'express';
import { deleteUser, updateUser, user, users } from '../controllers/users.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/", users);
router.get("/:id", user);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", deleteUser);

export default router;