const express = require("express");
require("dotenv").config();
const user = require("./routers/user");
const post = require("./routers/post");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const upload = require("./routers/upload");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({ origin: "https://rent-fahimefto.vercel.app", credentials: true })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    tempFileDir: "/tmp/",
  })
);
const port = process.env.PORT;

//route
app.use("/user", user);
app.use("/post", post);
app.use("/upload", upload);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server listening on port ${port}`);
});
