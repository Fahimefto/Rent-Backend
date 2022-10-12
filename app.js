const express = require("express");
require("dotenv").config();
const user = require("./routers/user");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

//route
app.use("/user", user);



app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${port}`);
});
