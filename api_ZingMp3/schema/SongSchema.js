const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    id: { type: Schema.ObjectId }, // khóa chính
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 50,
        minlength: 6,
    },
    author: {
        type: String,
        require: true,
        min: 0,
        max: 100000000,
    },
    image: {
        type: String,
        trim: true,
        require: true,
    },
    timesTamp: {
        type: String,
        trim: true,
        min: 0,
        max: 1000,
    },
    album : {
        type : String,
        require: true,
    }
});

module.exports = mongoose.models.song || 
                mongoose.model('song', SongSchema);