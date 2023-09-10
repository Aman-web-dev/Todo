

const express= require('express');
const dataRouter= express.Router();
const Todo = require('../Models/todoModel')


dataRouter.get('/alltodos',async(req,res)=>{

   const allData =await Todo.find().then(data=>
      res.status(200).send(data)
   ).catch(err=>res.status(500).send({error:err}))

})



module.exports=dataRouter