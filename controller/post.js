const supabase = require('../db');

const createPost = async (req, res, next) => {
  if (
    !req.body.date ||
    !req.body.area ||
    !req.body.description ||
    !req.body.title ||
    !req.body.contact
  ) {
    return res.json('fill all the fields');
  }
  try {
    const { data, error } = await supabase.from('post').insert({
      date: req.body.date,
      area: req.body.area,
      description: req.body.description,
      title: req.body.title,
      contact: req.body.contact,
      user_id: req.user.id,
    });
    if (error) {
      return res.status(401).json(error);
    } else {
      return res.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('post').select('*');
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const { data, error } = await supabase
      .from('post')
      .select('*')
      .eq('id', id);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const getPostByDivision = (req, res) => {};
const getPostByDistrict = (req, res) => {};
const getPostByUpazila = (req, res) => {};
module.exports = { createPost, getAllPosts, getPostById };
