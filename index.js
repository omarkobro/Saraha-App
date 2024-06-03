import express from 'express';
import userRouter from './src/Modules/User/user.router.js';
import messageRouter from './src/Modules/Message/message.router.js';
import db_connection from './DB/DB_Connection.js';
import { config } from 'dotenv';
import { globalResponse } from './src/middlewares/globalRespone.js';

config({path:"./config/dev.env"})

let app = express()

const port =  process.env.PORT
app.use(express.json())
app.use('/user', userRouter)
app.use('/msg', messageRouter)
app.use(globalResponse)

db_connection()
app.listen(port, ()=>{
    console.log("Project Is Working fine");
})