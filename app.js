const express = require('express');
require('dotenv').config();
const user = require('./routers/user');
const post = require('./routers/post');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

//route
app.use('/user', user);
app.use('/post', post);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${port}`);
});
