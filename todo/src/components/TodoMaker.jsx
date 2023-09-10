import React, { useState, useRef } from 'react'
import Card from './Card'
import Form from './Form'
import TodoList from './TodoList'



function TodoMaker () {
  const [formData, setFormData] = useState({
    todoName: "",
    description: "",
    status:"",
  })
  const pickedElement = useRef(0);
  const [todo, setTodo] = useState([])
  const [completedToDo, setCompletedToDo] = useState([])

  const handleFormSubmit =async (e) => {
    

    const newTodo={
      todoName: formData.todoName,
      description: formData.description,
      status:formData.status,
    }
    setTodo([...todo, newTodo])


    const response=await fetch("https://todo-backend-1la2.onrender.com/api/createtodo",{
      method:'POST',
      body:JSON.stringify(newTodo),
      headers:{
        "Content-Type":"application/json"
      }
    })

    console.log(response.body)

    if(response.ok){
      const result=await response.json();
      console.log("Todo Updated In data Base Successfully",result)
    }

    if(!response.ok){
      const result=await response.json();
      console.log('error Creating Todo in Database',result)
    }



    console.log(formData)
    console.log(todo)
  }


  

  const handleDragCapture = async (e) => {
    e.preventDefault();
   
    setCompletedToDo([...completedToDo, {
      todoName: todo[pickedElement.current].todoName,
      description: todo[pickedElement.current].description,
      status:todo[pickedElement.current].status,
    }])
    todo.splice(pickedElement.current, 1)
    console.log("completedArray", completedToDo)
  }

  const handleDelete = (index, array) => {
    const arraycopy = array;
    arraycopy.splice(index, 1)
    array==todo?setTodo([...arraycopy]):setCompletedToDo([...arraycopy])
  }




  return (
    <div>

      <div>
        <Form
          titleUpdate={(e) => { setFormData({ ...formData, todoName: e.target.value }) }}
          descriptionUpdate={(e) => setFormData({ ...formData, description: e.target.value })}
          statusUpdate={(e)=>setFormData({...formData,status:e.target.value})}
          submitFunction={(e) => handleFormSubmit(e)}
        />
      </div>

      <TodoList/>

        </div>
  )
}

export default TodoMaker
