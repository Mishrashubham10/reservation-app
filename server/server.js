import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const app = express();

const PORT = process.env.PORT || 4500;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});

app.listen(PORT, () => {
  connect();
  console.log('Connected to backend.');
});