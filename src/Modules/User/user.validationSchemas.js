import Joi from "joi";
import { Types } from "mongoose";

const objectIdValidation = (value , helper)=>{
    const isValid = Types.ObjectId.isValid(value)
    return isValid ? value : helper.message('invalid object id')
}



export let signInSchema = {
    body:Joi.object({
        userName: Joi.string().min(2).max(20).optional().messages({ "string.base": "Username must be a string", "string.empty": "Please Enter A Valid Username", "string.min": "Username must be at least 2 characters long", "string.max": "Username cannot be longer than 20 characters",  }),
        email: Joi.string().email({ tlds: { allow: ['com', 'org', 'yahoo'] }, minDomainSegments: 1 }).optional().messages({ "string.base": "Email must be a string", "string.empty": "Please Enter A Valid Email Address", "string.email": "Please Enter A Valid Email Address",}),
        password: Joi.string().min(6).max(16).optional().messages({ "string.base": "Password must be a string", "string.empty": "Please Enter A Valid Password", "string.min": "Password must be at least {#limit} characters long", "string.max": "Password cannot be longer than {#limit} characters", }),
    })
} 
export let signUpSchema = {
    body:Joi.object({
        userName: Joi.string().min(2).max(20).required().messages({ "string.base": "Username must be a string", "string.empty": "Please Enter A Valid Username", "string.min": "Username must be at least 2 characters long", "string.max": "Username cannot be longer than 20 characters", "any.required": "Username is required" }),
        email: Joi.string().email({ tlds: { allow: ['com', 'org', 'yahoo'] }, minDomainSegments: 1 }).required().messages({ "string.base": "Email must be a string", "string.empty": "Please Enter A Valid Email Address", "string.email": "Please Enter A Valid Email Address", "any.required": "Email is required" }),
        password: Joi.string().min(6).max(16).required().messages({ "string.base": "Password must be a string", "string.empty": "Please Enter A Valid Password", "string.min": "Password must be at least {#limit} characters long", "string.max": "Password cannot be longer than {#limit} characters", "any.required": "Password is required" }),
    })
} 
export let updateUserSchema = {
    body:Joi.object({
        userName: Joi.string().min(2).max(20).optional().messages({ "string.base": "Username must be a string", "string.empty": "Please Enter A Valid Username", "string.min": "Username must be at least 2 characters long", "string.max": "Username cannot be longer than 20 characters", }),
        email: Joi.string().email({ tlds: { allow: ['com', 'org', 'yahoo'] }, minDomainSegments: 1 }).optional().messages({ "string.base": "Email must be a string", "string.empty": "Please Enter A Valid Email Address", "string.email": "Please Enter A Valid Email Address"}),
    })
}


