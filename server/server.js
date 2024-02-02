import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { connect } from './db/db.js';

const PORT = process.env.PORT || 5000;

// DB CONNECTION
connect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is up runing at port : ${PORT}`)
    );
  })
  .catch((err) => {
    console.log('MONGO db connection failed! ', err);
  });