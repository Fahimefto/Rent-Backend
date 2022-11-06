const supabase = require("../db");
const moment = require("moment");

const createPost = async (req, res, next) => {
  if (
    !req.body.area ||
    !req.body.description ||
    !req.body.title ||
    !req.body.contact ||
    !req.body.upazila
  ) {
    return res.json("fill all the fields");
  }
  try {
    const imageArr = [
      {
        img: "https://res.cloudinary.com/dtcjz5osi/image/upload/v1667557151/rent/undraw_Personal_info_re_ur1n_1_cswr9i.png",
      },
      {
        img: "https://res.cloudinary.com/dtcjz5osi/image/upload/v1667557151/rent/undraw_Personal_info_re_ur1n_1_cswr9i.png",
      },
      {
        img2: "https://res.cloudinary.com/dtcjz5osi/image/upload/v1667508022/rent/undraw_Select_house_re_s1j9_kbmbhv.png",
      },
    ];

    const date = moment().format();

    const { data, error } = await supabase.from("post").insert({
      date: date,
      area: req.body.area,
      description: req.body.description,
      user_id: req.body.user_id,
      title: req.body.title,
      contact: req.body.contact,
      image: imageArr,
      district: req.body.district,
      division: req.body.division,
      upazila: req.body.upazila,
      postal_code: req.body.postal_code,
      room: req.body.room,
      fees: req.body.fees,
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
    const { data, error } = await supabase
      .from("post")
      .select("*")
      .order("id", { ascending: false });
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
      .from("post")
      .select("*")
      .eq("id", id);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const getPostByUserId = async (req, res) => {
  try {
    const id = req.params.id;

    const { data, error } = await supabase
      .from("post")
      .select("*")
      .eq("user_id", id)
      .order("id", { ascending: false });
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const getPostByUpazila = async (req, res) => {
  try {
    const { upazila } = req.body;
    console.log(upazila);
    const { data, error } = await supabase
      .from("post")
      .select("*")
      .eq("upazila", upazila)
      .order("id", { ascending: false });
    console.log(data);
    if (error) {
      return res.status(401).json(error);
    } else {
      return res.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const getPostByDistrict = async (req, res) => {
  try {
    const { district } = req.body;
    console.log(district);
    const { data, error } = await supabase
      .from("post")
      .select("*")
      .eq("district", district);
    console.log(data);
    if (error) {
      return res.status(401).json(error);
    } else {
      return res.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const getPostByDivision = async (req, res) => {
  try {
    const { division } = req.body;
    console.log(division);
    const { data, error } = await supabase
      .from("post")
      .select("*")
      .eq("division", division);
    console.log(data);
    if (error) {
      return res.status(401).json(error);
    } else {
      return res.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await supabase
      .from("post")
      .update({
        area: req.body.area,
        description: req.body.description,
        title: req.body.title,
        contact: req.body.contact,
        room: req.body.room,
        fees: req.body.fees,
        district: req.body.district,
        division: req.body.division,
        upazila: req.body.upazila,
        postal_code: req.body.postal_code,
      })
      .eq("id", id)
      .select();
    console.log(post.body[0]);
    return res.status(200).json({
      message: "updated successfully",
      data: post.body[0],
    });
  } catch (error) {
    console.log(error);
  }
};
const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { data, error } = await supabase.from("post").delete().eq("id", id);
    console.log(data);
    if (!data[0]) {
      return res.json({
        message: "post not found",
      });
    }
    return res.status(200).json({
      message: "deleted successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostByUserId,
  getPostByUpazila,
  updatePost,
  deletePost,
  getPostByDistrict,
  getPostByDivision,
};
