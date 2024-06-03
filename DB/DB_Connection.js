import mongoose from "mongoose";

let db_connection = async () =>{
    await mongoose.connect(process.env.CONNECTION_URL_LOCAL).then((res)=>{
        console.log("data base connected Successfully");
    }).catch((err)=>{
        console.log("db connection failed", err);
    })
}   

export default db_connection;