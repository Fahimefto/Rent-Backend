const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../db');
//to create a new user//

const register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.json('fill all the fields');
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const { error } = await supabase.from('users').insert({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(201).json('new user created successfully');
  } catch (error) {
    res.json(error);
  }
};
//login//
const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.json('both email and password required');
  try {
    const user = await supabase
      .from('users')
      .select('*')
      .eq('email', req.body.email);
    // console.log(user.data[0].id);
    // return res.status(200).json(user.data[0]);
    if (!user.data[0]) {
      console.log(user.data[0]);
      return res.status(404).json('no user found');
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.data[0].password
    );
    if (!isPasswordCorrect) {
      return res.json('incorrect password');
    }
    const payload = {
      id: user.data[0].id,
      name: user.data[0].name,
    };
    console.log(payload);

    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: '1d',
    });
    return res
      .cookie('access_token', token, { httpOnly:true  })
      .status(200)
      .json({
        message: 'login successfully',
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
    const { data, error } = await supabase.from('users').select('*');
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

//logout
const logout = (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('age');
  return res.status(200).json({ message: 'logout successful' });
};

module.exports = {
  getAllusesrs,
  register,
  login,
  logout,
};
