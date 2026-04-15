const mongoose= require('mongoose');

// first we will make schema
const urlSchema=new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    // original URL -> redirect URL
    redirectURL:{
        type: String,
        required: true,
    },
    visitHistory:[{
        timestamp:{type:Number}
    }]
},{timestamps:true});

const URL=mongoose.model("url",urlSchema);
module.exports=URL;