import express, { Router } from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, this is auths end point');
});

export default router;