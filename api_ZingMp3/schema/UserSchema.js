const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: { type: Schema.ObjectId }, // khóa chính
    email: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        unique: true, // duy nhất
        trim: true, // xóa khoảng trắng đầu và cuối
        lowercase: true, // chuyển về chữ thường
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 50,
        minlength: 6,        
    }
});

module.exports = mongoose.models.user || 
                mongoose.model('user', UserSchema);