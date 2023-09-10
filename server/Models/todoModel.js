const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todoName: {
    type: String,
    required: true,
  },
  description:{ 
    
    type:String,
     required:true,  
  },

  status: {
    type: String,
    enum: ['todo', 'doing', 'done'],
    default: 'todo',
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
