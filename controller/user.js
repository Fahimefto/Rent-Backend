const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

const getAllusesrs = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllusesrs,
  register,
};
