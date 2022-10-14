const supabase = require('../db');

const createPost = async (req, res, next) => {
  if (
    !req.body.date ||
    !req.body.address ||
    !req.body.discription ||
    !req.body.title ||
    !req.body.contact
  ) {
    return res.json('fill all the fields');
  }
  try {
    const { data, error } = await supabase.from('post').insert({
      date: req.body.date,
      address: req.body.address,
      discription: req.body.discription,
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
module.exports = { createPost, getAllPosts };
