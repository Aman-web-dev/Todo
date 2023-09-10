const Todo =require('../Models/todoModel')



const express=require('express')    
const createRouter=express.Router();


createRouter.post('/createtodo',async (req,res)=>{
    try{
        const {todoName,description,status}=req.body;
        const newTodo = new Todo({todoName,description,status})
        const savedTodo =await newTodo.save();
        res.status(201).json(savedTodo)

    }catch(err){
    res.status(500).json({error:`err creatoing todo ${err}`})
    console.log(err)

    }
})




module.exports=createRouter;