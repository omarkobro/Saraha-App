import { createDocumnet, findDocument } from "../../../DB/DB_Methods.js";
import Message from "../../../DB/Models/message.model.js";
import User from "../../../DB/Models/user.model.js";

//===================Send Message==================

export let sendMessage = async (req,res,next)=>{
    let {content} = req.body
    let {sentTo} = req.query
    let {_id} = req.authUser
    try {
        let IsUserExist = await findDocument(User, {_id:sentTo})
        //Data base method
        if(!IsUserExist.Success){
            return res.status(IsUserExist.Status).json({
                message:IsUserExist.Message
            })
        }
        else{
            let docCreation = await createDocumnet(Message, {content,sentTo, sentBy:_id})
            if(!docCreation.Success ){
                return res.status(docCreation.Status).json({
                    message:docCreation.Message
                }) 
            }
            else{
                res.status(docCreation.Status).json({
                    message:docCreation.Message
                })
            }
        }
    } catch (error) {
        console.log(error);
    }

} 

//===================Delete Message==================

export let deleteMessage = async(req,res,next)=>{
    let {messageId} = req.query
    let {_id} = req.authUser
    let deletedMessage = await Message.findOneAndDelete({_id:messageId, sentBy:_id})
    if (!deletedMessage){
        return res.status(400).json({
            message:"cannot delete This Message"
        })

    }
    res.status(200).json({
        message:"Message deleted successfully "
    })
}

//===================Mark Message as viewed ==================

export let markMessageAsRead = async (req,res,next)=>{ 
    let { messageId}= req.query
    let {_id} = req.authUser
    let updateMessage = await Message.findOneAndUpdate({_id:messageId,sentBy:_id, isViewed: false}
    ,{isViewed:true, $inc:{__v: 1}},
    {new:true})
    if(!updateMessage){
        return res.status(400).json({
            message:"Update Failed"
        })
    }
    res.status(200).json({
        message:"Update success"
    })
}

//===================get messages ==================

export let getUserMessages = async (req,res,next)=>{ 
    let {isViewed}= req.query
    let {_id} = req.authUser
    let messages = await Message.find({sentBy:_id, isViewed}).sort({createdAt: -1})
    if(!messages.length){
        return res.status(200).json({
            message:" No Messages Fot This User"
        })
    }
    res.status(200).json({
        yourMessages: messages
    }) 
}
