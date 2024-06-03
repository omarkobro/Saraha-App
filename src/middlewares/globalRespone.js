export let globalResponse = (err, req,res,next)=>{
    if(err){
        return res.json({
            message:"Catch Err",
            errorMessage:err.message,
            errorLocation:err.stack
        })
    }
}