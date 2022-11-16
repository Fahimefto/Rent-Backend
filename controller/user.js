const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../db");
//to create a new user//

const register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.json("fill all the fields");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const { error } = await supabase.from("users").insert({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    if (error) {
      return res.status(401).json("email taken");
    } else {
      return res.status(201).json("new user created successfully");
    }
  } catch (error) {
    res.json(error);
  }
};
//login//
const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.json("both email and password required");
  try {
    const user = await supabase
      .from("users")
      .select("*")
      .eq("email", req.body.email);
    // console.log(user.data[0].id);
    // return res.status(200).json(user.data[0]);
    if (!user.data[0]) {
      console.log(user.data[0]);
      return res.status(404).json("no user found");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.data[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(403).json("incorrect password");
    }
    const payload = {
      id: user.data[0].id,
      name: user.data[0].name,
    };
    console.log(payload);

    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json({
        message: "login successfully",
        token: token,
      });
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
};

//to get all the user
const getAllusesrs = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

//get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await supabase.from("users").select("*").eq("id", req.user.id);
    console.log(user.body[0]);
    return res.status(200).json(user.body[0]);
  } catch (error) {
    console.log(error);
  }
};

//logout
const logout = (req, res) => {
  res.clearCookie("access_token");

  return res.status(200).json({ message: "logout successful" });
};
//update user
const updateUser = async (req, res, next) => {
  try {
    if (!req.body.password) {
      const user = await supabase
        .from("users")
        .update({
          name: req.body.name,
          email: req.body.email,
        })
        .eq("id", req.user.id)
        .select();
      console.log(user.body[0]);
      return res.status(200).json({
        message: "updated successfully",
        data: user.body[0],
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = await supabase
        .from("users")
        .update({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        })
        .eq("id", req.user.id)
        .select();
      console.log(user.body[0]);
      return res.status(200).json({
        message: "updated successfully",
        data: user.body[0],
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const verifyUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(200).json({
      status: 401,
      message: "unauthorized access",
    });
  }
  return jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.json({ status: 401, message: "unauthorized access t" });
    }
    req.user = decoded;
    console.log(req.user);
    return res.json({ status: 200, message: "verified access" });
  });
};

module.exports = {
  verifyUser,
  getAllusesrs,
  register,
  login,
  logout,
  getCurrentUser,
  updateUser,
};
