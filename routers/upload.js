const router = require("express").Router();
const upload = require("../controller/upload");
router.get("/", upload.getUpload);

module.exports = router;
