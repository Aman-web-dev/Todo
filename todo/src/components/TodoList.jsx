import React, { useEffect, useState,useRef } from 'react'
import Card from './Card'

function TodoList() {

const [data,setData]=useState([])
const [completedToDo,setCompletedToDo]=useState([])
const [doing,setDoing]=useState([])
const [loading,setLoading]=useState(true)
const pickedElement=useRef("")


const fetchData=async ()=>{
  const response=await fetch("https://todo-backend-1la2.onrender.com/api/alltodos")
  if(response.ok){
    const result=await response.json()

    const todoArray=await result.filter((elem)=>elem.status=='todo');
    const completedArray= await result.filter((elem)=>elem.status=='done');
    const doingArray= await result.filter((elem)=>elem.status=='doing');

  
   setData(todoArray);
   setCompletedToDo(completedArray);
   setDoing(doingArray)
   console.log("doing",doing)
   setLoading(false)
  }
  if(!response.ok){
    const error=await response.json;
    console.log("error",error)
    setLoading(false)
  }
}

const deleteData=async (id)=>{
  const deleteData={_id:id}
  const data = await fetch("https://todo-backend-1la2.onrender.com/api/deletetodo",{
    method:"DELETE",
    body:JSON.stringify(deleteData),
    headers:{
      "Content-Type":"application/json"
    }
  })
  if(data.ok){
    fetchData()
  }
  if(!data.ok){
    console.log("error")
  }
}


const handleDragCapture = async (e,status) => {
  e.preventDefault();
console.log(pickedElement.current,status)
}


useEffect(()=>{
fetchData()
console.log(data)
},[])
  return (

    <div className='flex flex-row  justify-around m-auto'>
<div className='' onDragLeave={(e) => handleDragCapture(e)}>
<p className='text-3xl p-2 font-bold m-auto'>Todo</p>
  {
    loading ?"loading":
      data.map((elem)=><Card
      title={elem.todoName}
      key={elem._id}
      description={elem.description}
      status={elem.status}
      dragStart={() => pickedElement.current = elem._id}
      handleDelete={() => deleteData(elem._id,todo)}
      />)
}
</div>


<div className='border border-black  black' onDragLeav={(e) => handleDragCapture(e)}>

  <p className='text-3xl p-2 font-bold m-auto'>Done</p>

{
        loading ?"loading":
          completedToDo.map((elem, index) => <Card
          value={index}
          key={elem._id}
          title={elem.todoName}
          status={elem.status}
          description={elem.description}
          dragStart={() => pickedElement.current = elem._id}
          handleDelete={()=>deleteData(elem._id,todo)}
          />)
}
</div>  


<div className='border border-black  black' onDragLeave={(e) => handleDragCapture(e)}>

<p className='text-3xl p-2 font-bold m-auto'>Doing</p>


{
        loading?"loading":
         doing.map((elem) => <Card
          key={elem._id}
          title={elem.todoName}
          status={elem.status}
          description={elem.description}
          dragStart={() => pickedElement.current = elem._id}
          handleDelete={()=>deleteData(elem._id,todo)}
          />)
}
</div> 


</div>
  )
}

export default TodoList
