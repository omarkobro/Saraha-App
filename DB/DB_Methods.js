import { model } from "mongoose"

export let findDocument = async(model, query)=>{

    if(!model || !query){   
        return {Message:"Invalid Arguments", Status: 400, Success: false}
    }
    let isDocExist = await model.findOne(query)
    if(!isDocExist){
        return {Message:"Document not found", Status: 404, Success: false}}
        else{
            return {Message:"Document found", Status: 200, Success: true}
        }
}



export let createDocumnet = async(model, data)=>{
    
    if(!model || !data){   
        return {Message:"Invalid Arguments", Status: 400, Success: false}
    }

    let createDoc = await model.create(data)

    if(!createDoc){
        return {Message:"Creation Failed", Status: 400, Success: false}
    }
    else{
        return {Message:"Creation Success", Status: 201, Success: true}

    }

}