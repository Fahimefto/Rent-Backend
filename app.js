const express = require('express');
require('dotenv').config();
const user = require('./routers/user');

const app = express();
app.use(express.json());

const port = process.env.PORT;

//route
app.use('/user', user);

app.get('/', (req, res) => {
  res.send('Hello World!....');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
