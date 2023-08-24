const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  BannerSchema = new Schema( {
    id : {type : Schema.ObjectId},
    image : {
        type : String,
        trim:true,
        require : true,
    }
});

module.exports = mongoose.model.banner ||
                mongoose.model('banner',BannerSchema);
                    