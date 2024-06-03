import Joi from "joi";
import { Types } from "mongoose";

const objectIdValidation = (value , helper)=>{
    const isValid = Types.ObjectId.isValid(value)
    return isValid ? value : helper.message('invalid object id')
}



export let sendMessageSchema = {
    body:Joi.object({
        content: Joi.string().required().messages({ "string.base": "Content must be a string", "string.empty": "Content cannot be empty", "any.required": "Content is required" }),
        _id: Joi.string().custom(objectIdValidation)
    }),
    query:Joi.object({
        sentTo: Joi.string().custom(objectIdValidation)
    }),
} 
export let deleteMessage = {
    body:Joi.object({
        _id: Joi.string().custom(objectIdValidation)
    }),
    query:Joi.object({
        messageId: Joi.string().custom(objectIdValidation)
    }),
} 
export let markIsViewedSchema = {
    body:Joi.object({
        _id: Joi.string().custom(objectIdValidation)
    }),
    query:Joi.object({
        messageId: Joi.string().custom(objectIdValidation)
    }),
} 
export let getUserMessagesSchema = {
    query:Joi.object({
        isViewed: Joi.boolean().required(),
    }),
} 


