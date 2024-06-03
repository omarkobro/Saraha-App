import { Schema, model } from "mongoose"



let userSchema = new Schema({
    userName:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        required:true, 
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true, 
    },
    isConfirmed:{
        type:Boolean,
        default: false
    },
    ProfilePic:{
        type:String,
    }
},{timestamps:true})

let User = model("User", userSchema)

export default User