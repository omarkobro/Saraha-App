// import User from "../../../DB/Models/user.model.js"
import bcrypt from 'bcryptjs'
import User from '../../../DB/Models/user.model.js'
import jwt from 'jsonwebtoken'

// =================================== SignUp====================
export let SignUp = async(req,res,next)=>{
    let {userName, email, password} = req.body
    //USERNAME Check
    let checkUserName = await User.findOne({userName})
    if(checkUserName){
        return res.json({message:"username already exists please try another one"})
    }
    let checkEmail = await User.findOne({email})

    if(checkEmail){
        return res.json({message:"email already exists please try another one"})
    }
    let hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    let createUser = await User.create({userName, email,password: hashedPassword})
    if(createUser){
        res.json({message:"Signed Up Successfully"})
    }
    else{
        res.json({message:"Sign Up Failed Try Again"})
    }
}


// =================================== Sign in====================

export let signIn = async (req,res,next)=>{
    let {userName, email ,password} = req.body

    let user = await User.findOne({
        $or:[
            {userName},
            {email}
        ]
    })

    if(!user){
        res.json({message:"Invalid Login Credentials",status : 401})
    }
    let passwordCheck = bcrypt.compareSync(password, user.password)
    if(!passwordCheck){
        return res.json({message:"Invalid Login Credentials",status : 401})
    }
    // Generate the token
    const token = jwt.sign(
        {id:user._id , userEmail:user.email},
        process.env.LOGIN_SIGNATURE,
        {
            expiresIn: '48h'
        }
    )
    user.save()
    res.json({message:"Welcome",status : 200, token})
}

// ===================================Update Users====================


export let updateUser = async (req,res,next)=>{
    let {userName, email} = req.body
    let {_id} = req.authUser
    let updatedObject = {}

    if(userName){
        let DoesUserExist = await User.findOne({userName})

        if(DoesUserExist){
            return res.json({message:"Username already exist"})
        }
        updatedObject.userName = userName
    }

    if(email){
        let DoesUserExist = await User.findOne({email})

        if(DoesUserExist){
            return res.json({message:"email already exist"})
        }
        updatedObject.email = email
    }

    let updateUser = await User.findByIdAndUpdate(_id,updatedObject)
    if(!updateUser){
        return res.json({message:"invalid User Id",status:400})
    }
    else{
        return res.json({message:"Updated Successfuly",status:200})
    }
}


// ===================================delete Users====================

export let deleteUser = async (req,res,next)=>{
    let {_id} = req.authUser
    let user = await User.findByIdAndDelete(_id)
    if(!user){
        return res.json({message:"deletion failed",status:400})
    }
    return res.json({message:"deleted Successfully",status:200})
}

// ===================================get User====================

export let getUser = async (req,res,next)=>{
    let {_id} = req.query

    let user = await User.findById(_id)

    if(!user){
        return res.json({
            message:"user Not Found",
            status:400
        })
    }
    else{
        return res.json({
            user,
            status:200
        })
    }
}