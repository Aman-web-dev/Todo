const express = require('express');
const deleteRouter = express.Router()
const Todo =require('../Models/todoModel')


deleteRouter.delete('/deletetodo',async (req,res)=>{
    const _id =req.body
    try{
                 const response=await  Todo.findByIdAndDelete(_id)
               
                    res.status(200).send("Todo Deleted SuccessFully")
                 
    }catch(err){
        console.log(err)
        res.status(500).send({error:err})
    }
})



module.exports=deleteRouter;