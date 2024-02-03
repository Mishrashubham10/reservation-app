import { asyncHandler } from '../utils/asynHandler.js';
import User from '../models/user.model.js';

// UPDATE User
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "Id is required" })

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

    res.status(200).json(updatedUser);
});

// DELETE User
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "Id is required" })

    const user = await User.findByIdAndDelete(id);

    res.status(200).json({ message: `User with the username ${user.username} deleted` });
});

// GET User
const user = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "Id is required" })

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
});

// GET Users
const users = asyncHandler(async (req, res) => {
    const users = await User.find();

    if (!users) return res.status(400).json({ message: "Users not found" })

    res.status(200).json(users);
});

export { updateUser, deleteUser, user, users };