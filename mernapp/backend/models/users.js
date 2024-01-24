const mongoose= require('mongoose');
const {Schema}= mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
        password:{
            type:String,
            require:true
        },

    email:{
        type:String,
        require:true,
    },
    phoneNo:{
        type:Number,
        require:true,
    },
    Date:{
        type:Date,
        default:Date.now
    }
})
module.exports= mongoose.model('user',UserSchema)