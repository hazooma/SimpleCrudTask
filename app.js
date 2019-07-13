import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/router';

config();
const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/blogging';

// Database connection
mongoose.connect(DB_URL, { useNewUrlParser: true });

// Database event handler
mongoose.connection.on('connected', () => {
  console.log('Connected to database ');
});

mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`listening to port ${PORT}`);
  }
});
app.use('/', router);
