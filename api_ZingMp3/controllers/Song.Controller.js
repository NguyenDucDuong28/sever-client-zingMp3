const SongSchema = require("../schema/SongSchema");

const GetSong = async function (req, res, next) {
  try {
    
    let query = {};
    const song = await SongSchema.find(query);
    res.json(song);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const PostSong = async function (req, res, next) {
  try {
    let { file, body } = req;
    if (file) {
      file = `http://localhost:3030/images/${file.filename}`;
      body = { ...body, image : file };
    }
    console.log(file)
    const { name, author, album, image, timesTamp } = body;
    // lấy id từ album
    // const listAlbum  = await SongSchema.findById(album)
    // Kiểm Tra dữ LIệu
    // if (!name || !album_id || !album_name || !image || !timesTamp || !author) {
    //   throw new Error("Tất cả các field phải được thêm vào");
    // }
    // lưu bào db
    const song = new SongSchema({
      name,
      author,
      image,
      timesTamp,
      album,
    });
    const result = await song.save();
    console.log(result);
    res.json({ message: "Thêm mới thành Công", result });
  } catch (error) {
    res.json({ error: error.message });
  }
};



const PutSong = async function (req, res, next) {
  try {
    const { id } = req.params;
    // đọc dữ liệu từ body
    const { name, author, album, image, timesTamp } = req.body;
    // kiêm tra dữ liêu
    if (!name || !album || !author || !image || !timesTamp) {
      throw new Error("Tất cả các field phải được thêm vào");
    }
    // lấy sản phẩm theo id
    const song = await SongSchema.findById(id);
    // cập nhật vào db
    if (song) {
      song.name = name || song.name; // nấu có thằng name thì lấy thằng name ko có thì lấy thằng song.name
      song.author = author || song.author;
      song.image = image || song.image;
      song.timesTamp = timesTamp || song.timesTamp;
      song.album =  album || song.album;
      const result = await song.save();
      res.json({ menubar: "Cập nhật thành công sản phẩm", result });
    } else {
      throw new Error("Không Tìm Thấy sản phẩm");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};


const DeleteSong = async function (req, res, next) {
  try {
    let { id } = req.params;
    // xóa sản phẩm trong db
    const result = await SongSchema.deleteOne({ _id: id });
    res.json({ message: "Bạn đã xóa bài hát này thành công", result });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { GetSong, PostSong, PutSong, DeleteSong };
