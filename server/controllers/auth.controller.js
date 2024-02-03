import { asyncHandler } from '../utils/asynHandler.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// REGISTER
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(404).json({ message: 'All fields must be filled' });

  // Hashing password
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObj = {
    username,
    email,
    password: hashedPwd,
  };

  const user = await User.create(userObj);

  res.status(200).json(user, { message: 'User has been created' });
});

// LOGIN
const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password)
    return res.status(404).json({ message: 'All fields must be filled' });

  // find user by username
  const user = await User.findOne({ username }).select('-isAdmin');

  if (!user) return res.status(404).json({ message: 'User not found' });

  // Compare passwords
  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.status(400).json({ message: 'Wrong password or username' });

  // creating token
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET
  );

  // Cookie options
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie('access_token', token, {
      options,
    })
    .json(user);
});

// LOGOUT
const logout = asyncHandler(async (req, res) => {});

export { register, login, logout };