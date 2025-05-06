const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add a user name"]
    },
    email:{
        type:String,
        required:[true,"Please add an email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please add a password number"]
    },
    
},
{
    timestamps:true
})

const User= mongoose.model("User",userSchema);
module.exports= User;