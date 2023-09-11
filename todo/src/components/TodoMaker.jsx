import React, { useState, useRef } from 'react'
import Form from './Form'
import TodoList from './TodoList'



function TodoMaker () {
  const [formData, setFormData] = useState({
    todoName: "",
    description: "",
    status:"",
  })
  const [loading,setLoading]=useState(false)
 
 
  const handleFormSubmit =async (e) => {
 e.preventDefault();

    setLoading(true)
    const newTodo={
      todoName: formData.todoName,
      description: formData.description,
      status:formData.status,
    }
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

    setLoading(false)
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

      {
        loading?"":<TodoList/>
      }
        </div>
  )
}

export default TodoMaker