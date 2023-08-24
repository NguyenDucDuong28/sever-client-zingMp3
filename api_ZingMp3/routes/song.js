const express = require("express");
const router = express.Router();

const SongController = require("../controllers/Song.Controller");
const upload = require("../middleware/UploadFile");


router.get("/", SongController.GetSong);

// thêm bài  bài hat
// URL : POST http://localhost:3030/song
router.post("/", [upload.single("image")], SongController.PostSong);

// // Câp nhật sản phẩm bài hát
// // URl : PUT  http://localhost:3030/song/:id
router.put("/:id", SongController.PutSong);

router.delete("/:id", SongController.DeleteSong);

module.exports = router;
