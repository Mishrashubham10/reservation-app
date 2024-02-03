import express, { Router } from 'express';
import { deleteUser, updateUser, user, users } from '../controllers/users.controller.js';

const router = express.Router();

router.get("/", users);
router.get("/:id", user);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;