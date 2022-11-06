const { Router } = require("express");
const fsExtra = require("fs-extra");
const router = Router();
const cloudinary = require("../util/cloudinary");
const fs = require("fs");

const getUpload = async (req, res) => {
  try {
    const files = req.files;

    const imagebuffer = [];
    if (files.image.length > 1) {
      for (let i = 0; i < files.image.length; i++) {
        const { tempFilePath } = files.image[i];
        const data = await cloudinary.uploader.upload(tempFilePath, {
          folder: "rentPost",
          resource_type: "auto",
        });
        let obj = { img: data.secure_url };
        imagebuffer.push(obj);
        console.log(obj);
        tempDel(tempFilePath);
      }

      return imagebuffer;
    } else {
      const { tempFilePath } = files.image;
      const data = await cloudinary.uploader.upload(tempFilePath, {
        folder: "rentPost",
      });

      let obj = { img: data.secure_url };
      imagebuffer.push(obj);
      console.log(obj);
      tempDel(tempFilePath);

      return imagebuffer;
    }
  } catch (error) {
    console.log(error.message);
    fsExtra.emptyDirSync("./tmp");
  }
};
//for deleting image- **dummy funcion**
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cloudinary.uploader.destroy(id);
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const tempDel = async (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
};

module.exports = { getUpload };
