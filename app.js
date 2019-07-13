import express from 'express';

const app = express();
const PORT = 8080;

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`listening to port ${PORT}`);
  }
});
app.get('/', (req, res) => res.send('Hello World!'));
