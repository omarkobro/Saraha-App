import { Schema, model } from "mongoose"



let messageSchema = new Schema({
    content:{
        type:String,
        required:true,
    },
    sentTo:{ 
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    sentBy:{ 
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isViewed:{
        type:Boolean,
        default: false
    },

},{timestamps:true})

let Message = model("Message", messageSchema)

export default Message