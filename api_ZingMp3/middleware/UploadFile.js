const multer = require("multer");

// định nghĩa hàm lưu file

const storage = multer.diskStorage({
    // định thư mục lưu file
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  // định  nghĩa tên file
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.filename + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
